import toggleModal from './utils.js'


const modalImageWindow = document.querySelector(".modal_type_image");
const modalImageBig = modalImageWindow.querySelector(".modal__image");
const modalImageBigTitle = modalImageWindow.querySelector(".modal__image-title");

class Card {
    constructor(data, templateSelector) {
        this._link = data.link;
        this._name = data.name;
        this._templateSelector = templateSelector;
    }

    _getNewCardTemplate() {
        const cardTemplate = document.querySelector(this._templateSelector).content.querySelector(".elements__item");
        return cardTemplate;
    }

    _handlePicPrev() {
        modalImageBig.src = this._link;
        modalImageBig.alt = this._name;
        modalImageBigTitle.textContent = this._name;
        toggleModal(modalImageWindow);

    }

    _handleLike(evt) {
        evt.target.classList.toggle('elements__like-button_active');

    }

    _handleDelete(evt) {
        evt.target.closest('.elements__item').remove();

    }

    _setEventListeners() {
        this._cardImage.addEventListener('click', this._handlePicPrev.bind(this));
        this._cardLikeButton.addEventListener('click', this._handleLike);
        this._cardDeleteButton.addEventListener('click', this._handleDelete);
    };

    generateCard() {
        this._card = this._getNewCardTemplate().cloneNode(true);
        this._cardImage = this._card.querySelector(".elements__image");
        this._card.querySelector('.elements__title').textContent = this._name;
        this._cardImage.style.backgroundImage = `url(${this._link})`;
        this._cardLikeButton = this._card.querySelector('.elements__like-button');
        this._cardDeleteButton = this._card.querySelector('.elements__delete-button');
        this._setEventListeners();

        return this._card;
    }

}

export default Card;