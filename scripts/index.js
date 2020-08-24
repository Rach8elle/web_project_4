//DECLARING VARIABLES

//wrappers
const formEditProfile = document.querySelector(".form_type_edit-profile");
const formAddCard = document.querySelector(".form_type_add-card");
const addCardModalWindow = document.querySelector(".modal_type_add-card");
const editProfileModalWindow = document.querySelector(".modal_type_edit-profile");
const imageModalWindow = document.querySelector(".modal_type_image");
const modalImage = imageModalWindow.querySelector(".modal__image");
const modalImageTitle = imageModalWindow.querySelector(".modal__image-title");
const list = document.querySelector(".elements__items");
const modal = document.querySelector(".modal");

//openButtons
const editModalButton = document.querySelector(".profile__edit-button");
const addCardModalButton = document.querySelector(".profile__add-button");

//closeButtons
const closeAddCardModalButton = addCardModalWindow.querySelector(".modal__close-button");
const closeProfileModalButton = editProfileModalWindow.querySelector(".modal__close-button");
const closeImageModalButton = imageModalWindow.querySelector(".modal__close-button");

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



//FUNCTIONS

//to open and close modals  and also to close with window click
function toggleModalWindow(modal) {
    modal.classList.toggle("modal_opened");
    closeWindowOnClick(modal);
    closeWithEscape(modal);
};


// to close modal with window click
function closeWindowOnClick(modal) {
    const openModal = document.querySelector('.modal_opened');
    const modalIsOpen = modal.classList.contains('modal_opened');
    window.onclick = function(evt) {
        if (evt.target === openModal && modalIsOpen) {
            toggleModalWindow(modal);
        }
    };
}

//to close modals with escape key
function closeWithEscape(modal) {
    window.addEventListener('keydown', function(event) {
        const modalIsOpen = modal.classList.contains('modal_opened');
        if (event.key === 'Escape' &&
            modalIsOpen) {
            toggleModalWindow(modal);
        }
    })
}


//submits edit profile window profile edit modal
function handleFormSubmit(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    toggleModalWindow(editProfileModalWindow);
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

    cardLikeButton.addEventListener("click", function(evt) {
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

    return cardElement;
}

//event listeners

//submits and closes edit profile window
formEditProfile.addEventListener("submit", handleFormSubmit);
editModalButton.addEventListener("click", () => {
    if (!editProfileModalWindow.classList.contains("modal_opened")) {
        nameInput.value = profileName.textContent;
        aboutInput.value = profileAbout.textContent;
    }
    toggleModalWindow(editProfileModalWindow);
});
//closes profile modal window
closeProfileModalButton.addEventListener("click", () => {
    toggleModalWindow(editProfileModalWindow);
});

//opens the window to  add a new card
addCardModalButton.addEventListener("click", () => {
    toggleModalWindow(addCardModalWindow);
});

//closes the window that adds a card
closeAddCardModalButton.addEventListener("click", () => {
    toggleModalWindow(addCardModalWindow);
});

//closes the enlarged image when user clicks close button
closeImageModalButton.addEventListener("click", () => {
    toggleModalWindow(imageModalWindow);
});


//form to add card at the beginning when user inputs title and link
formAddCard.addEventListener("submit", (evt) => {
    evt.preventDefault();
    list.prepend(createCard(cardTitleInput.value, cardImageLinkInput.value));
    toggleModalWindow(addCardModalWindow);
});

//creates initial gallery of cards
initialCards.forEach((data) => {
    list.prepend(createCard(data.name, data.link));
});