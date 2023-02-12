import React from "react";
export const Card = ({ card, onCardClick }) => {
  function handleClick() {
    onCardClick(card);
  }

  return (
    <li className="card__item">
      <img
        className="card__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      <button className="card__delete" type="button"></button>
      <div className="card__name">
        <h3 className="card__text">{card.name}</h3>
        <div className="card__wrapper">
          <button className="card__like" type="button"></button>
          <p className="card__like-quantity">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};
