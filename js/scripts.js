const userApi = 'https://randomuser.me/api/?results=12&inc=name,email,location,dob,picture,cell&nat=us&noinfo';


// create Gallery function to display a card for employees
function createGallery(people) {
  let galleryHTML = '';
  for (let i = 0; i < people.length; i++) {
    let person = people[i];
    galleryHTML += `
      <div class="card" data-index="${i}">
        <div class="card-img-container">
          <img class="card-img" src="${person.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="${person.name.first}-${person.name.last}" class="card-name cap">${person.name.first} ${person.name.last}</h3>
          <p class="card-text">${person.email}</p>
          <p class="card-text cap">${person.location.city}</p>
        </div>
      </div>
    `;
  }
  // console.log("hello");

  gallery.innerHTML = galleryHTML;
}
// regex DOB
function formatBirthday(person) {
  const dob = person.dob.date;
  const regex = /(\d{4})-(\d{2})-(\d{2}).*/;
  const replacement = '$2/$3/$1';
  return dob.replace(regex, replacement);

}

// creates modal function and the popup with employee details
function createModal(people, index) {
  const person = people[index];
  const modalContainer = document.createElement('div');

  document.body.appendChild(modalContainer);
  modalContainer.className = 'modal-container';
  modalContainer.innerHTML = `
    <div class="modal">
      <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
      <div class="modal-info-container">
        <img class="modal-img" src="${
          person.picture.large
        }" alt="profile picture">
        <h3 id="${person.name.first}-${
person.name.last
}-modal" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
        <p class="modal-text">${person.email}</p>
        <p class="modal-text cap">${person.location.city}</p>
        <hr>
        <p class="modal-text">${person.cell}</p>
        <p class="modal-text">${person.location.street.number} ${
person.location.street.name
}, ${person.location.city}, ${person.location.state} ${
person.location.postcode
}</p>
        <p class="modal-text">Birthday: ${formatBirthday(person)}</p>
      </div>
    </div>
    `;

  // close modal when button is clicked
  const closeButton = document.querySelector('#modal-close-btn');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(modalContainer);
  });
}

// async function to fetch data
async function runProgram() {
  let people;

  // returns the employee info and displays it
  await fetch(
      userApi
    )
    .then(res => res.json())
    .then(json => {
      people = json.results;
      createGallery(people);
    });

  const cards = document.querySelector('.card');

  // event listener for employee card
  // event handler creates popup modal when employee clicked
  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    card.addEventListener('click', () => {
      createModal(people, card.dataset.index);
    });
  }
}

runProgram();