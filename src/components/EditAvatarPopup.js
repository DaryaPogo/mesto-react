import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const imageRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: imageRef.current.value,
    });
  }

  React.useEffect(() => {
    imageRef.current.value = "";
  }, [props.isOpen]);

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={props.onClose}
      isOpen={props.isOpen}
      title="Обновить аватар"
      name="avatar"
      buttonText="Сохранить"
      children={
        <>
          <input
            ref={imageRef}
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
  );
}
export default EditAvatarPopup;
