const addcardContainer = document.querySelector('.elements__items');
const addCardTitle = document.querySelector('.elements__title');
const addCardUrl = document.querySelector('.elements__image');
const addCardTitleInput = document.querySelector('.form__input_type_card-title');
const addCardUrlInput = document.querySelector('.form__input_type_url');


function addCard(addCardTitleValue, addCardUrlValue) {
 
  const cardTemplate = document.querySelector('.card-template').content.querySelector('.elements__item');
  const list = document.querySelector('.elements__items');
  console.log('(from addCard function) selects items between card template tags');
  const cardElement = cardTemplate.cloneNode(true);
  console.log('(from add card function) clones items between template tags')
  const cardImage = cardElement.querySelector('.elements__image');
  console.log('creates card Image');
  const cardTitle = cardElement.querySelector('.elements__title').textContent = addCardTitleValue;
  console.log('creates card title');
  const cardUrl = cardElement.querySelector('.elements__image').textContent = addCardUrlValue;
  console.log('creates card image from elements__image class');

  const cardDeleteButton = cardElement.querySelector('.elements__delete-button');
  console.log('creates card delete button');

  cardTitle.textContent = data.name;
  cardImage.style.backgroundImage = `url(${data.link})`;



  cardElement.querySelector('.elements__like-button').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like-button_active');
    console.log("creates function to make like button functional")
});
  
  songsContainer.append(songElement);
  console.log('(from addsong function) adds one song card')
}

addButton.addEventListener("click", function () {
  const artist = document.querySelector(".input__text_type_artist");
  const title = document.querySelector(".input__text_type_title");

  addSong(artist.value, title.value);
  console.log('(from addButton function) uses the addSong function, (which creates one card) and sets the artistTitle and artistSong of that card to the value from the inputs. each click of this button creates an additional card.')
  renderHasSongs();

  artist.value = "";
  title.value = "";
});

resetButton.addEventListener("click", function () {
  const songs = document.querySelectorAll(".song");

  songs.forEach((item) => {
    item.remove();
  });

  renderNoSongs();
});
