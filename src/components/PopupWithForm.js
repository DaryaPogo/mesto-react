import React from "react";

function PopupWithForm(props) {
  return (
    <section
      className={`popup popup-${props.name}  + ${props.isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button className="popup__close" type="button" onClick={props.onClose}></button>
        <form
          className="popup__form popup__form-profile"
          name={props.name}
          noValidate
        >
          <h2 className="popup__title">{props.title}</h2>
          {props.children}
          <button type="submit" className="popup__button">
            {props.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
