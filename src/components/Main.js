import React from "react";
import api from "../utils/API";
import { Card } from "./Card";

function Main(props) {
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api.getInfo().then((data) => {
      setUserName(data.name);
      setUserDescription(data.about);
      setUserAvatar(data.avatar);
    });
  }, []);

  React.useEffect(() => {
    api.getCards().then((cards) => {
      setCards(cards);
    });
  }, []);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__wrapper-avatar">
          <button
            className="profile__btn"
            type="button"
            onClick={props.onEditAvatar}
          ></button>
          <img
            style={{ backgroundImage: `url(${userAvatar})` }}
            alt={userName}
            className="profile__avatar"
          />
        </div>
        <div className="profile__wrapper">
          <div className="profile__rename">
            <h1 className="profile__name">{userName}</h1>
            <button
              className="profile__change"
              type="button"
              onClick={props.onEditProfile}
            ></button>
          </div>
          <p className="profile__job">{userDescription}</p>
        </div>
        <button
          className="profile__submit"
          type="button"
          onClick={props.onAddPlace}
        ></button>
      </section>
      <section className="card">
        <ul className="card__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={props.onCardClick}
            />
          ))}

        </ul>
      </section>
    </main>
  );
}
export default Main;