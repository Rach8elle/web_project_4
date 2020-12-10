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


class Card {
    constructor(data, templateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;

    }

    _getCardTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".elements__item");

        return cardTemplate;
    }

    _setEventListeners() {
        const cardImage = this._card.querySelector(".elements__image");
        const cardDeleteButton = this._card.querySelector(
            ".elements__delete-button"
        );
        const cardLikeButton = this._card.querySelector(".elements__like-button");


        cardLikeButton.addEventListener("click", () => {
            cardLikeButton.classList.toggle("elements__like-button_active");
        });

        cardDeleteButton.addEventListener("click", () => {
            const listItem = cardDeleteButton.closest(".elements__item");
            listItem.remove();
        });

        cardImage.addEventListener("click", () => {
            const modalImageWindow = document.querySelector(".modal_type_image");
            const modalImageBig = modalImageWindow.querySelector(".modal__image");
            const modalImageBigTitle = modalImageWindow.querySelector(".modal__image-title");
            modalImageBig.src = this._link;
            modalImageBig.alt = this._name;
            modalImageBigTitle.textContent = this._name;
            toggleModal(modalImageWindow);
        });


    }


    generateCard() {

        this._card = this._getCardTemplate().cloneNode(true);
        const cardImage = this._card.querySelector(".elements__image");


        this._card.querySelector('.elements__title').textContent = this._name;
        cardImage.style.backgroundImage = `url(${this._link})`;

        this._setEventListeners();

        return this._card;
    }
}

export default Card;