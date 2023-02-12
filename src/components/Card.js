import React from "react";
export const Card = (props) => {
  const {card, onCardClick} = props;

  function handleClick() {
    onCardClick(card);
  }  

  return (
    <li className="card__item">
      <img
        className="card__image"
        style={{ backgroundImage: `url(${props.card.link})` }}
        onClick={handleClick}
      />
      <button className="card__delete" type="button"></button>
      <div className="card__name">
        <h3 className="card__text">{props.card.name}</h3>
        <div className="card__wrapper">
          <button className="card__like" type="button"></button>
          <p className="card__like-quantity">{props.card.likes.length}</p>
        </div>
      </div>
    </li>
  );
};
