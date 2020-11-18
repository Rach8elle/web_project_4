import FormValidator from './FormValidator.js';

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
const cardTemplate = document.querySelector(".card-template").content.querySelector(".elements__item");
const initialCards = [{
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



//creates the cards with their buttons images and titles and close buttons and like button
function createCard(title, imageLink) {
    //eliminates the add card modal opening on page load
    let element = document.getElementById('add-card');
    element.classList.remove('modal_type_add-card');

    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".elements__image");
    const cardTitle = cardElement.querySelector(".elements__title");
    const cardDeleteButton = cardElement.querySelector(
        ".elements__delete-button"
    );
    const cardLikeButton = cardElement.querySelector(".elements__like-button");

    cardTitle.textContent = title;
    cardImage.style.backgroundImage = `url(${imageLink})`;


    // transform 3 event listeners to only one
    cardLikeButton.addEventListener("click", () => {
        cardLikeButton.classList.toggle("elements__like-button_active");
    });

    cardDeleteButton.addEventListener("click", () => {
        const listItem = cardDeleteButton.closest(".elements__item");
        listItem.remove();
    });

    cardImage.addEventListener("click", () => {
        modalImageBig.src = imageLink;
        modalImageBig.alt = title;
        modalImageBigTitle.textContent = title;
        toggleModal(modalImageWindow);
    });

    return cardElement;
}



//form to add card at the beginning when user inputs title and link
formAddCard.addEventListener("submit", (evt) => {
    evt.preventDefault();
    list.prepend(createCard(cardTitleInput.value, cardImageLinkInput.value));
    toggleModal(modalAddCard);
});

//creates initial gallery of cards
initialCards.forEach((data) => {
    list.prepend(createCard(data.name, data.link));
});

// modal

//close modal with escape button
const ESC_KEY = 27;

const closeWithEsc = ({ keyCode }) => {
    if (keyCode === ESC_KEY) {
        const activeModal = document.querySelector('.modal_opened');
        toggleModal(activeModal);
    }
}


//close modal on click on overlay
const closeWithClick = ({ target }) => {
    if (target.classList.contains('modal__close-button') ||
        target.classList.contains('modal')) {
        const activeModal = document.querySelector('.modal_opened');
        toggleModal(activeModal);
    }
};

//Close modal if open
const toggleModal = modal => {
    const isModalOpened = modal.classList.contains('modal_opened');


    modal.classList.toggle('modal_opened');

    if (isModalOpened) {
        document.removeEventListener('keydown', closeWithEsc);
        modal.removeEventListener('click', closeWithClick);

    } else {
        document.addEventListener('keydown', closeWithEsc);
        modal.addEventListener('click', closeWithClick);
    }
};

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