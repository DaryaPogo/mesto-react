import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import React, { useEffect, useState } from "react";
import { ImagePopup } from "./ImagePopup";
import api from "../utils/API";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";

function App() {
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState([]);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getInfo()
      .then((currentUser) => {
        setCurrentUser(currentUser);
      })
      .catch((err) => console.log(err));
    api
      .getCards()
      .then((cards) => {
        setCards(cards);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleCardClick(selectedCard) {
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

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then((res) => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.log(err));
  }
  function handleUpdateUser({ name, about }) {
    api
      .editProfile({ name, about })
      .then((currentUser) => {
        setCurrentUser({ ...currentUser, name, about });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar({ avatar }) {
    api
      .changeAvatar({ avatar })
      .then((currentUser) => {
        setCurrentUser({ ...currentUser, avatar });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleAddPlaceSubmit({ place, link }) {
    api
      .addNewCard({ place, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <>
          <Header />
          <Main
            cards={cards}
            onEditAvatar={() => {
              handleEditAvatarClick(true);
            }}
            onAddPlace={() => {
              handleAddPlaceClick(true);
            }}
            onEditProfile={() => {
              handleEditProfileClick(true);
            }}
            onCardClick={(selectedCard) => {
              handleCardClick(selectedCard);
            }}
            onCardLike={(card) => {
              handleCardLike(card);
            }}
            onCardDelete={(card) => {
              handleCardDelete(card);
            }}
          />
          <Footer />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            addPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            onClose={closeAllPopups}
            title="Вы уверены?"
            name="deleteProfile"
            buttonText="Да"
          />
        </>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
