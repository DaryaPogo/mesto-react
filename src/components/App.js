import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import React from "react";
import {ImagePopup} from './ImagePopup'

function App() {

  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);


  function handleCardClick(selectedCard){
    setSelectedCard(selectedCard);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(!isAddPlacePopupOpen);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard(null);
  }

  return (
    <div>
      <>
        <Header />
        <Main
          onEditAvatar={() => {
            handleEditAvatarClick(true);
          }}
          onAddPlace={() => {
            handleAddPlaceClick(true);
          }}
          onEditProfile={() => {
            handleEditProfileClick(true);
          }}
          onCardClick={(selectedCard) => {handleCardClick(selectedCard)}}
        />
        <Footer />

        <ImagePopup 
        card={selectedCard}
        onClose={closeAllPopups}
        />

        <PopupWithForm
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          title="Редактировать профиль"
          name="profile"
          children={
            <>
              <input
                type="text"
                className="popup__input popup__input_type_name"
                defaultValue="Жак-Ив Кусто"
                name="name"
                required
                placeholder="Имя"
                minLength="2"
                maxLength="40"
              />
              <span className="input-error-name"></span>
              <input
                type="text"
                className="popup__input popup__input_type_job"
                defaultValue="Исследователь океана"
                name="job"
                placeholder="О себе"
                required
                minLength="2"
                maxLength="200"
              />
              <span className="input-error-job"></span>
            </>
          }
        />
        <PopupWithForm
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          title="Новое место"
          name="place"
          children={
            <>
              <input
                type="text"
                className="popup__input popup__input_type_place"
                name="place"
                placeholder="Название"
                required
                minLength="2"
                maxLength="30"
              />
              <span className="input-error-place"></span>
              <input
                type="url"
                className="popup__input popup__input_type_link"
                name="link"
                placeholder="Ссылка на картинку"
                required
              />
              <span className="input-error-link"></span>
            </>
          }
        />
        <PopupWithForm
          onClose={closeAllPopups}
          title="Вы уверены?"
          name="deleteProfile"
          children={
            <>
              <button type="submit" className="popup__button">
                Да
              </button>
            </>
          }
        />
        <PopupWithForm
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
          title="Обновить аватар"
          name="avatar"
          children={
            <>
              <input
                className="popup__input"
                type="url"
                placeholder="Ссылка на картинку"
                name="avatar"
                required
              />
              <span className="input-error-avatar"></span>
            </>
          }
        />


      </>
    </div>
  );
}

export default App;
