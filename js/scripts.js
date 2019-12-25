const userApi = 'https://randomuser.me/api/?results=12&inc=name,email,location,dob,picture,cell&nat=us&noinfo';

//  gallery card template
const galleryCard = (person, i) => {
  return `
      <div class="card" data-index="${i}">
        <div class="card-img-container">
          <img class="card-img" src="${person.picture.large}" alt="profile picture">
        </div>
        <div class="card-info-container">
          <h3 id="${person.name.first}-${person.name.last}" class="card-name cap">
            ${person.name.first} ${person.name.last}
          </h3>
          <p class="card-text">${person.email}</p>
          <p class="card-text cap">${person.location.city}</p>
        </div>
      </div>
    `;
}

// modal body template
const modalBody = (person) => {
  return `
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
        <p class="modal-text">
          ${person.location.street.number} ${person.location.street.name},
          ${person.location.city},
          ${person.location.state} ${person.location.postcode}
        </p>
        <p class="modal-text">Birthday: ${formatBirthday(person)}</p>
      </div>
    </div>
    `;
}

// create Gallery function to display a card for employees
const createGallery = (people) => {
  let galleryHTML = '';
  let person = '';

  for (let i = 0; i < people.length; i+=1) {
    person = people[i];

    if(person) {
      gallery.innerHTML += galleryCard(person, i);
    }
  }
}

// regex Date Of Birth
const formatBirthday = (person) => {
  const dob = person.dob.date;
  const regex = /(\d{4})-(\d{2})-(\d{2}).*/;
  const replacement = '$2/$3/$1';

  return dob.replace(regex, replacement);
}

// creates modal function and the popup with employee details
const createModal = (people, index) => {
  const person = people[index];
  const modalContainer = document.createElement('div');

  document.body.appendChild(modalContainer);
  modalContainer.className = 'modal-container';
  modalContainer.innerHTML = modalBody(person);

  closeModal(modalContainer);
}

// close modal when button is clicked
const closeModal = modalContainer => {
  const closeButton = document.querySelector('#modal-close-btn');

  closeButton.addEventListener('click', () => {
    document.body.removeChild(modalContainer);
  });
}

// async function to fetch data
const runProgram = async () => {
  let people;

  // returns the employee info and displays it
  await fetch(
      userApi
    )
    .then(res => res.json())
    .then(json => {
      people = json.results;

      if(people) {
        createGallery(people);
      }
    });

  const cards = document.querySelectorAll('.card');

  // event listener for employee card
  // event handler creates popup modal when employee clicked
  for (let i = 0; i < cards.length; i+=1) {
    const card = cards[i];
    card.addEventListener('click', () => {

      if(people) {
        createModal(people, card.dataset.index);
      }
    });
  }
}

runProgram();