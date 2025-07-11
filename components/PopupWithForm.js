import Popup from "./Popup.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";
class PopupWithForm extends Popup {
  constructor({ popupSelector, handleFormSubmit }) {
    super(popupSelector);
    this._popupForm = this._popupElement.querySelector(".popup__form");
    this._handleFormSubmit = handleFormSubmit;
  }
  getForm() {
    return this._popupForm;
  }
  _getInputValues() {
    const values = {};
    values.id = uuidv4();
    values.completed = false;
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
