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



fetch('http://localhost:3000/players')
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
    })
});



function deletePlayer(event) {}