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
const editModalButton = document.querySelector(".profile__edit-button");
const modalAddCardButton = document.querySelector(".profile__add-button");

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



//FUNCTIONS

//to open and close modals  and also to close with window click CODE THAT WORKS KEEP
function toggleModalWindow(modal) {
    modal.classList.toggle("modal_opened");
    closeWithClick(modal);
    closeWithEsc(modal);
};






//experiment
// function toggleModalWindow(modal) {
//     modal.classList.toggle("modal_opened");
//     const modalIsOpen = modal.classList.contains('modal_opened');

//     if (modalIsOpen) {
//         modal.removeEventListener('click', closeWithClick);
//         document.removeEventListener('keydown', closeWithEsc);
//     } else {
//         modal.addEventListener('click', closeWithClick);
//         document.addEventListener('keydown', closeWithEsc);
//     }
// };


//experiment from rebecca
// function closeWithEsc(modal) {
//     if (modal.classList.contains('modal_opened') {
//             if (modal === modalAddCard) {
//                 closeModal(modal)
//             } else if (modal === modalEditProfile) {
//                 closeModal(modal)
//             } else
//             if (modal = modalImageWindow) {
//                 closeModal(modal)
//             }
//         }
//experiment

// function closeModal {

// }



// to close modal when clicking outside of the modal this works
function closeWithClick(modal) {
    const openModal = document.querySelector('.modal_opened');
    const modalIsOpen = modal.classList.contains('modal_opened');
    window.addEventListener('click', function(evt) {
        if (evt.target === openModal && modalIsOpen) {
            toggleModalWindow(modal);
        }
    })
}

//to close modals with escape key
function closeWithEsc(modal) {
    window.addEventListener('keydown', function(event) {
        const modalIsOpen = modal.classList.contains('modal_opened');
        if (event.key === 'Escape' &&
            modalIsOpen) {
            toggleModalWindow(modal);
        }
    })
}


//prevents browser default
function editFormSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileAbout.textContent = aboutInput.value;
    toggleModalWindow(modalEditProfile);
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
        modalImageBig.src = imageLink;
        modalImageBig.setAttribute("alt", title);
        modalImageBigTitle.textContent = title;
        toggleModalWindow(modalImageWindow);
    });

    return cardElement;
}

//event listeners

//submits and closes edit profile window
formEditProfile.addEventListener("submit", editFormSubmitHandler);
editModalButton.addEventListener("click", () => {
    if (!modalEditProfile.classList.contains("modal_opened")) {
        nameInput.value = profileName.textContent;
        aboutInput.value = profileAbout.textContent;
    }
    toggleModalWindow(modalEditProfile);
});
//closes profile modal window
closeProfileModalButton.addEventListener("click", () => {
    toggleModalWindow(modalEditProfile);
});

//opens the window to  add a new card
modalAddCardButton.addEventListener("click", () => {
    toggleModalWindow(modalAddCard);
});

//closes the window that adds a card
closeModalAddCardButton.addEventListener("click", () => {
    toggleModalWindow(modalAddCard);
});

//closes the enlarged image when user clicks close button
closeModalImageWindowButton.addEventListener("click", () => {
    toggleModalWindow(modalImageWindow);
});


//form to add card at the beginning when user inputs title and link
formAddCard.addEventListener("submit", (evt) => {
    evt.preventDefault();
    list.prepend(createCard(cardTitleInput.value, cardImageLinkInput.value));
    toggleModalWindow(modalAddCard);
});

//creates initial gallery of cards
initialCards.forEach((data) => {
    list.prepend(createCard(data.name, data.link));
});