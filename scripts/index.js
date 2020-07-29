const editModalButton = document.querySelector('.button__edit');
const closeModalButton = document.querySelector('.button__close');
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
)