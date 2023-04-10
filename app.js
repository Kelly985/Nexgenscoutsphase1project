let slideIndex = 0;
 showSlides();

 function showSlides() {
  let slides = document.getElementsByClassName("slideshow-image");
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("active");
  }
  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }
  slides[slideIndex - 1].classList.add ("active");
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}


const fetchUrl = "https://nexgenplayers.onrender.com/players"
fetch(fetchUrl)
  .then(response => response.json())
  .then(data => {
    const playersContainer = document.getElementById('players-container');
    data.forEach(player => {
      const playerCard = document.createElement('div');
      playerCard.classList.add('player-card');
      playerCard.innerHTML = `
        <h2>${player.name}</h2>
        <img src="${player.image}">
        <p>Position: ${player.position}</p>
        <p>Age: ${player.age}</p>
        <p>Weight: ${player.weight} kg</p>
        <p>Height: ${player.height} cm</p>
        <p>Nationality: ${player.nationality}</p>
        <p>Key Attribute: ${player.key_attribute}</p>
        <button class="edit-player-button" data-player-id="${player.id}">Edit</button>
        <button class="deleteBtn" data-player-id="${player.id}">Delete</button>`;
      playersContainer.appendChild(playerCard);


        // Add event listeners for edit and delete buttons
        const editButton = playerCard.querySelector('.edit-player-button');
        editButton.addEventListener('click', editPlayer);

      const deleteButton = playerCard.querySelector('.deleteBtn');
       deleteButton.addEventListener('click', deletePlayer);

       
    })
});



function deletePlayer(event) {
    const playerId = event.target.getAttribute('data-player-id');
    fetch(`${fetchUrl}/${playerId}`, {
   method: 'DELETE' })
      .then(response => {
        if (response.ok) {
          const playerCard = event.target.closest('.player-card');
          playerCard.remove();
        } else {
          throw new Error(`Failed to delete player with ID ${playerId}`);
        }
      })
      .catch(error => {
        console.error(error);
        alert('Failed to delete player. Please try again later.');
      });
}


function editPlayer(event) {
const playerId = event.target.getAttribute('data-player-id');
  
  // Get the player data from the server
  fetch(`${fetchUrl}/${playerId}`)
    .then(response => response.json())
    .then(player => {
      // Create an editable form for the player
      const form = document.createElement('form');
      form.innerHTML = `
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" value="${player.name}" required><br>
        <label for="image">Image URL:</label>
        <input type="text" id="image" name="image" value="${player.image}" required><br>
        <label for="position">Position:</label>
        <input type="text" id="position" name="position" value="${player.position}" required><br>
        <label for="age">Age:</label>
        <input type="number" id="age" name="age" value="${player.age}" required><br>
        <label for="weight">Weight (kg):</label>
        <input type="number" id="weight" name="weight" value="${player.weight}" required><br>
        <label for="height">Height (cm):</label>
        <input type="number" id="height" name="height" value="${player.height}" required><br>
        <label for="nationality">Nationality:</label>
        <input type="text" id="nationality" name="nationality" value="${player.nationality}" required><br>
        <label for="key_attribute">Key Attribute:</label>
        <input type="text" id="key_attribute" name="key_attribute" value="${player.key_attribute}" required><br>
        <button type="submit">Save</button>
      `;
      
      // Replace the player card with the form
      const playerCard = event.target.closest('.player-card');
      playerCard.replaceWith(form);
      
      // Add event listener for the form submission
      form.addEventListener('submit', event => {
        event.preventDefault();
        
        // Collect the updated data from the form
        const updatedPlayer = {
          name: form.elements.name.value,
          image: form.elements.image.value,
          position: form.elements.position.value,
          age: form.elements.age.value,
          weight: form.elements.weight.value,
          height: form.elements.height.value,
          nationality: form.elements.nationality.value,
          key_attribute: form.elements.key_attribute.value,
        };
        
        // Send the updated data to the server
        fetch(`${fetchUrl}/${playerId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedPlayer)
        })
        .then(response => response.json())
        .then(updatedPlayer => {
          // Replace the form with the updated player card
          const updatedPlayerCard = document.createElement('div');
          updatedPlayerCard.classList.add('player-card');
          updatedPlayerCard.innerHTML = `
            <h2>${updatedPlayer.name}</h2>
            <img src="${updatedPlayer.image}">
            <p>Position: ${updatedPlayer.position}</p>
            <p>Age: ${updatedPlayer.age}</p>
            <p>Weight: ${updatedPlayer.weight} kg</p>
            <p>Height: ${updatedPlayer.height} cm</p> 
            <p>Nationality: ${updatedPlayer.nationality}</p> 
            <p>Key Attribute: ${updatedPlayer.key_attribute}</p> 
            <button class="edit-player-button" data-player-id="${updatedPlayer.id}">Edit</button> 
            <button class="delete-button" data-player-id="${updatedPlayer.id}">Delete</button>`;


            form.replaceWith(updatedPlayerCard);

// Add event listeners for the edit and delete buttons on the updated player card
const editButton = updatedPlayerCard.querySelector('.edit-player-button');
editButton.addEventListener('click', editPlayer);

const deleteButton = playerCard.querySelector('.deleteBtn');
deleteButton.addEventListener('click', deletePlayer);
      })})
.catch(error => {
console.error('Error updating player:', error)
})})}

// searchbox implementation

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const searchQuery = searchInput.value;
  fetch(`${fetchUrl}?q=${searchQuery}`)
    .then(response => response.json())
    .then(data => {
      const playersContainer = document.getElementById('players-container');
      playersContainer.innerHTML = ''; // Clear existing player cards
      data.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.classList.add('player-card');
        playerCard.innerHTML = `
          <h2>${player.name}</h2>
          <img src="${player.image}">
          <p>Position: ${player.position}</p>
          <p>Age: ${player.age}</p>
          <p>Weight: ${player.weight} kg</p>
          <p>Height: ${player.height} cm</p>
          <p>Nationality: ${player.nationality}</p>
          <p>Key Attribute: ${player.key_attribute}</p>
          <button class="edit-player-button" data-player-id="${player.id}">Edit</button>
          <button class="deleteBtn" data-player-id="${player.id}">Delete</button>`;
        playersContainer.appendChild(playerCard);
      })
    })
});


const addPlayerButton = document.getElementById('add-player-button');
addPlayerButton.addEventListener('click', addPlayer);

function addPlayer() {
  // Create an empty form for the new player
  const form = document.createElement('form');
  form.innerHTML = `
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" required><br>
    <label for="image">Image URL:</label>
    <input type="text" id="image" name="image" required><br>
    <label for="position">Position:</label>
    <input type="text" id="position" name="position" required><br>
    <label for="age">Age:</label>
    <input type="number" id="age" name="age" required><br>
    <label for="weight">Weight (kg):</label>
    <input type="number" id="weight" name="weight" required><br>
    <label for="height">Height (cm):</label>
    <input type="number" id="height" name="height" required><br>
    <label for="nationality">Nationality:</label>
    <input type="text" id="nationality" name="nationality" required><br>
    <label for="key_attribute">Key Attribute:</label>
    <input type="text" id="key_attribute" name="key_attribute" required><br>
    <button type="submit">Add</button>
  `;

  // Replace the "Add Player" button with the form
  addPlayerButton.replaceWith(form);

  // Add event listener for the form submission
  form.addEventListener('submit', event => {
    event.preventDefault();

    // Collect the data from the form
    const newPlayer = {
      name: form.elements.name.value,
      image: form.elements.image.value,
      position: form.elements.position.value,
      age: form.elements.age.value,
      weight: form.elements.weight.value,
      height: form.elements.height.value,
      nationality: form.elements.nationality.value,
      key_attribute: form.elements.key_attribute.value,
    };

    // Send the new player data to the server
    fetch(fetchUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPlayer)
    })
    .then(response => response.json())
    .then(createdPlayer => {
      // Create a new player card for the created player
      const playerCard = document.createElement('div');
      playerCard.classList.add('player-card');
      playerCard.innerHTML = `
        <h2>${createdPlayer.name}</h2>
        <img src="${createdPlayer.image}">
        <p>Position: ${createdPlayer.position}</p>
        <p>Age: ${createdPlayer.age}</p>
        <p>Weight: ${createdPlayer.weight} kg</p>
        <p>Height: ${createdPlayer.height} cm</p>
        <p>Nationality: ${createdPlayer.nationality}</p>
        <p>Key Attribute: ${createdPlayer.key_attribute}</p>
        `;
          // Insert the new player card at the end of the list
  const playerList = document.getElementById('player-list');
  playerList.appendChild(playerCard);

  // Reset the form and replace the player form with the "Add Player" button
  form.reset();
  playerCard.after(addPlayerButton);
})
.catch(error => console.error('Error adding player:', error));
});
}
