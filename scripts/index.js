//DECLARING VARIABLES

//wrappers
const formEditProfile = document.querySelector(".form_type_edit-profile");
const formAddCard = document.querySelector(".form_type_add-card");
const modalAddCard = document.querySelector(".modal_type_add-card");
const modalEditProfile = document.querySelector(".modal_type_edit-profile");
const modalImageWindow = document.querySelector(".modal_type_image");
const modalImageBig = modalImageWindow.querySelector(".modal__image");
const modalImageBigTitle = modalImageWindow.querySelector(".modal__image-title");
const list = document.querySelector(".elements__items");

//openButtons
const editProfileModalButton = document.querySelector(".profile__edit-button");
const openModalAddCardButton = document.querySelector(".profile__add-button");

//closeButtons
const closeModalAddCardButton = modalAddCard.querySelector(".modal__close-button");
const closeProfileModalButton = modalEditProfile.querySelector(".modal__close-button");
const closeModalImageWindowButton = modalImageWindow.querySelector(".modal__close-button");

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

//prevents browser default
function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    toggleModal(modalEditProfile);
}

//creates the cards with their buttons images and titles and close buttons and like button
function createCard(title, imageLink) {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImage = cardElement.querySelector(".elements__image");
    const cardTitle = cardElement.querySelector(".elements__title");
    const cardDeleteButton = cardElement.querySelector(
        ".elements__delete-button"
    );
    const cardLikeButton = cardElement.querySelector(".elements__like-button");

    cardTitle.textContent = title;
    cardImage.style.backgroundImage = `url(${imageLink})`;
    cardImage.setAttribute("alt", title);

    // transform 3 event listeners to the only one
    cardLikeButton.addEventListener("click", function(evt) {
        evt.target.classList.toggle("elements__like-button_active");
    });

    cardDeleteButton.addEventListener("click", () => {
        const list = cardDeleteButton.closest(".elements__item");
        list.remove();
    });

    cardImage.addEventListener("click", () => {
        modalImageBig.src = imageLink;
        modalImageBig.setAttribute("alt", title);
        modalImageBigTitle.textContent = title;
        toggleModal(modalImageWindow);
    });

    return cardElement;
}

//submits and closes edit profile window
formEditProfile.addEventListener("submit", editFormSubmitHandler);

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
let activeModal = null;

//function to close with escape button
const closeWithEsc = ({ keyCode }) => {
    if (keyCode === 27) {
        toggleModal(activeModal);
    }
};

//function to close modal on click anywhere
const closeWithModalClick = ({ target }) => {
    if (target.classList.contains('modal__close-button') ||
        target.classList.contains('modal')) {
        toggleModal(activeModal);
    }
};

//function to check to see if modal is open and close with esc and click if it is
const toggleModal = modal => {
    const isModalOpened = modal.classList.contains('modal_opened');

    activeModal = modal;
    modal.classList.toggle('modal_opened');

    if (isModalOpened) {
        document.removeEventListener('keydown', closeWithEsc);
        modal.removeEventListener('click', closeWithModalClick);
        activeModal = null;
    } else {
        document.addEventListener('keydown', closeWithEsc);
        modal.addEventListener('click', closeWithModalClick);
    }
};
//function to open edit profile modal this WORKS KEEP IT
// editProfileModalButton.addEventListener('click', () => {
//     toggleModal(modalEditProfile);
// });

//function to open add a new card modal
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