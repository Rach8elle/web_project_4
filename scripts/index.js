import FormValidator from './FormValidator.js';
import Card from './Card.js';
import initialCards from "./initialCards.js"
import toggleModal from './utils.js'

const defaultConfig = {
    formSelector: ".form",
    inputSelector: ".form__input",
    submitButtonSelector: ".modal__save-button",
    inactiveButtonClass: "modal__save-button_disabled",
    inputErrorClass: "form__input_type_error",
    errorClass: "form__error_visible"
};

const modalEditProfile = document.querySelector(".modal_type_edit-profile");
const modalAddCard = document.querySelector(".modal_type_add-card");

const formEditProfile = modalEditProfile.querySelector(".form");
const formAddCard = modalAddCard.querySelector(".form");


const editFormValidator = new FormValidator(defaultConfig, formEditProfile);
const addFormValidator = new FormValidator(defaultConfig, formAddCard);

editFormValidator.enableValidation()
addFormValidator.enableValidation()

//DECLARING VARIABLES

//wrappers
const modalImageWindow = document.querySelector(".modal_type_image");
const modalImageBig = modalImageWindow.querySelector(".modal__image");
const modalImageBigTitle = modalImageWindow.querySelector(".modal__image-title");
const list = document.querySelector(".elements__items");


//openButtons
const editProfileModalButton = document.querySelector(".profile__edit-button");
const openModalAddCardButton = document.querySelector(".profile__add-button");


//profileSection
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");

//formInputs
const nameInput = document.querySelector(".form__input_type_name");
const aboutInput = document.querySelector(".form__input_type_about");
const cardImageLinkInput = document.querySelector(".form__input_type_url");
const cardTitleInput = document.querySelector(".form__input_type_card-title");

//cards


//form to add new card at the beginning when user inputs title and link
formAddCard.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const createCard = new Card({ name: cardTitleInput.value, link: cardImageLinkInput.value }, '#card-template')
    list.prepend(createCard.generateCard());
    toggleModal(modalAddCard);
});


initialCards.forEach((data) => {
    const card = new Card(data, '#card-template');
    list.prepend(card.generateCard());
});


//function to open add-new-card modal
openModalAddCardButton.addEventListener('click', () => {
    toggleModal(modalAddCard);
});

//submits and closes edit profile window
formEditProfile.addEventListener("submit", editFormSubmitHandler);
editProfileModalButton.addEventListener("click", () => {
    if (!modalEditProfile.classList.contains("modal_opened")) {
        nameInput.value = profileName.textContent;
        aboutInput.value = profileAbout.textContent;
    }
    toggleModal(modalEditProfile);
});


function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    toggleModal(modalEditProfile);
}