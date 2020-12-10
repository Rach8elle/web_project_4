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

export default function toggleModal(modal) {
    modal.classList.toggle('modal_opened');
    if (modal.classList.contains('modal_opened')) {
        modal.addEventListener('click', closeWithClick);
        document.addEventListener('keydown', closeWithEsc);

    } else {
        modal.removeEventListener('click', closeWithClick);
        document.removeEventListener('keydown', closeWithEsc);
    }
}