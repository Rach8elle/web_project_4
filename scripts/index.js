const editModalButton = document.querySelector('.profile__edit-button');
const closeModalButton = document.querySelector('.modal__close-button');
const modal = document.querySelector('.modal');
const form = document.querySelector('.form');
const nameInput = document.querySelector('.form__input_type_name');
const aboutInput = document.querySelector('.form__input_type_about');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');


function toggleModal() {
  if (modal.classList.contains('modal_opened') === false) {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
  }
  modal.classList.toggle('modal_opened');
}

editModalButton.addEventListener('click', toggleModal);
closeModalButton.addEventListener('click', toggleModal);



form.addEventListener('submit', function (e) {
  e.preventDefault();

  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;

  toggleModal();
}
);


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

initialCards.forEach(data => {
  const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__item');
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector('.elements__image');
  const cardTitle = cardElement.querySelector('.elements__title');
  const cardLikeButton = cardElement.querySelector('.elements__like-button');
  const cardDeleteButton = cardElement.querySelector('.elements__delete-button');

  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url(${data.link})`;

  const list = document.querySelector('.elements__items');

  list.prepend(cardElement);


});



