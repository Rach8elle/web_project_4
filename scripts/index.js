//wrappers
const formEditProfile = document.querySelector(".form_type_edit-profile");
const formAddCard = document.querySelector(".form_type_add-card");
const addCardModalWindow = document.querySelector(".modal_type_add-card");
const editProfileModalWindow = document.querySelector(".modal_type_edit-profile");
const imageModalWindow = document.querySelector(".modal_type_image");
const modalImage = imageModalWindow.querySelector(".modal__image");
const modalImageTitle = imageModalWindow.querySelector(".modal__image-title");
const list = document.querySelector(".elements__items");


//openButtons
const editModalButton = document.querySelector(".profile__edit-button");
const addCardModalButton = document.querySelector(".profile__add-button");

//closeButtons
const closeAddCardModalButton = addCardModalWindow.querySelector(".modal__close-button");
const closeProfileModalButton = editProfileModalWindow.querySelector(".modal__close-button");
const closeImageModalButton = imageModalWindow.querySelector(".modal__close-button");

//Profile section
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

//Form Inputs
const nameInput = document.querySelector(".form__input_type_name");
const aboutInput = document.querySelector(".form__input_type_about");
const cardImageLinkInput = document.querySelector(".form__input_type_url");
const cardTitleInput = document.querySelector(".form__input_type_card-title");

function toggleModalWindow(modal) {
  modal.classList.toggle("modal_opened");
}

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileAbout.textContent = aboutInput.value;
  toggleModalWindow(editProfileModalWindow);
}

formEditProfile.addEventListener("submit", handleFormSubmit);
editModalButton.addEventListener("click", () => {
  if (!editProfileModalWindow.classList.contains("modal_opened")) {
    nameInput.value = profileName.textContent;
    aboutInput.value = profileAbout.textContent;
  }
  toggleModalWindow(editProfileModalWindow);
});

closeProfileModalButton.addEventListener("click", () => {
  toggleModalWindow(editProfileModalWindow);
});

addCardModalButton.addEventListener("click", () => {
  toggleModalWindow(addCardModalWindow);
});

closeAddCardModalButton.addEventListener("click", () => {
  toggleModalWindow(addCardModalWindow);
});

closeImageModalButton.addEventListener("click", () => {
  toggleModalWindow(imageModalWindow);
});

const cardTemplate = document.querySelector(".card-template").content.querySelector(".elements__item");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

initialCards.forEach((data) => {
  addCard(data.name, data.link);
});

function addCard(title, imageLink) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImage = cardElement.querySelector(".elements__image");
  const cardTitle = cardElement.querySelector(".elements__title");
  const cardDeleteButton = cardElement.querySelector(
    ".elements__delete-button"
  );

  cardTitle.textContent = title;
  cardImage.style.backgroundImage = `url(${imageLink})`;
  cardImage.setAttribute("alt", title);

  cardElement
    .querySelector(".elements__like-button")
    .addEventListener("click", function (evt) {
      evt.target.classList.toggle("elements__like-button_active");
    });

  cardDeleteButton.addEventListener("click", () => {
    const list = cardDeleteButton.closest(".elements__item");
    list.remove();
  });

  cardImage.addEventListener("click", () => {
    modalImage.src = imageLink;
    modalImage.setAttribute("alt", title);
    modalImageTitle.textContent = title;

    toggleModalWindow(imageModalWindow);
  });

  list.prepend(cardElement);
}

formAddCard.addEventListener("submit", (event) => {
  event.preventDefault();
  addCard(cardTitleInput.value, cardImageLinkInput.value);
  toggleModalWindow(addCardModalWindow);
});

