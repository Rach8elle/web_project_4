//wrappers
const form = document.querySelector('.form');
const addCardModalWindow = document.querySelector('.modal_type_add-card');
const editProfileModalWindow = document.querySelector('.modal_type_edit-profile');

//openButtons
const editModalButton = document.querySelector('.profile__edit-button');
const addCardModalButton = document.querySelector('.profile__add-button');


//closeButtons

const closeAddCardModalButton = addCardModalWindow.querySelector('.modal__close-button');
const closeModalButton = editProfileModalWindow.querySelector('.modal__close-button');


//Buttons and other DOM elements



//Profile section
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

//Form Inputs
const nameInput = document.querySelector('.form__input_type_name');
const aboutInput = document.querySelector('.form__input_type_about');



function toggleModalWindow(modal) {
  modal.classList.toggle('modal_opened');
}

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  toggleModalWindow(editProfileModalWindow);
}

form.addEventListener('submit', formSubmitHandler);
editModalButton.addEventListener('click', () => {
  if (!editProfileModalWindow.classList.contains('modal_opened')) {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
  }
  toggleModalWindow(editProfileModalWindow);
});


closeModalButton.addEventListener('click', () => {
  toggleModalWindow(editProfileModalWindow);

});


addCardModalButton.addEventListener('click', () => {
  toggleModalWindow(addCardModalWindow);
});

closeAddCardModalButton.addEventListener('click', () => {
  toggleModalWindow(addCardModalWindow);
})



const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg"
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg"
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg"
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg"
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg"
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg"
  }
];

const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__item');
const list = document.querySelector('.elements__items');

initialCards.forEach(data => {

  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardTitle = cardElement.querySelector('.elements__title');
  const cardLikeButton = cardElement.querySelector('.elements__like-button');
  const cardDeleteButton = cardElement.querySelector('.elements__delete-button');

  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url(${data.link})`;

  cardLikeButton.addEventListener('click', () => {
    //changeLikeState()
  });

  cardDeleteButton.addEventListener('click', () => {
    //handleCardDeleteClick()
  });

  cardImage.addEventListener('click', () => {
    //open modal
  });

  list.prepend(cardElement);
});



