import Popup from "./Popup.js";
class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  _getInputValues() {
    const values = {};
    const inputList = this._popupForm.querySelectorAll(".popup__input");
    inputList.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }
  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const values = this._getInputValues();
      this._handleFormSubmit(values);
      this._popupForm.reset();
      this.close();
    });
  }
}
export default PopupWithForm;
