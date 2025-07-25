class Todo {
  constructor(data, selector, handleCheckbox, handleDeleteBtn) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheckbox = handleCheckbox;
    this._handleDeleteBtn = handleDeleteBtn;
  }
  _setEventListeners() {
    this._todoCheckboxEl.addEventListener("change", () => {
      this._data.completed = !this._data.completed;
      this._handleCheckbox(this._data.completed);
    });
    this._todoDeleteBtn.addEventListener("click", () => {
      this._handleDeleteBtn(this._data.completed);
      this._todoElement.remove();
    });
  }
  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    const todoLabel = this._todoElement.querySelector(".todo__label");
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoCheckboxEl.checked = this._data.completed;
    todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }
  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);
    const todoNameEl = this._todoElement.querySelector(".todo__name");

    const todoDate = this._todoElement.querySelector(".todo__date");
    this._todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    todoNameEl.textContent = this._data.name;
    const dueDate = new Date(this._data.date);
    if (!isNaN(dueDate)) {
      todoDate.textContent = `Due: ${dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }
    this._generateCheckboxEl();
    this._setEventListeners();
    return this._todoElement;
  }
}
export { Todo };
