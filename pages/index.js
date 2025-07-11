import { initialTodos, validationConfig } from "../utils/constants.js";
import { Todo } from "../components/Todo.js";
import { FormValidator } from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";
const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const todoCounter = new TodoCounter(initialTodos, ".counter__text");
const handleCheck = (completed) => {
  todoCounter.updateCompleted(completed);
};
const handleDelete = (completed) => {
  if (completed) {
    todoCounter.updateCompleted(!completed);
    todoCounter.updateTotal(!completed);
  } else {
    todoCounter.updateTotal(completed);
  }
};
const handleAddTodo = () => {
  todoCounter.updateTotal(true);
};

const generateTodo = (data) => {
  const todo = new Todo(
    data,
    "#todo-template",
    handleCheck,
    handleDelete,
    handleAddTodo
  );
  const todoElement = todo.getView();
  return todoElement;
};
function generateAndAddTodo(item) {
  const element = generateTodo(item);
  section.addItem(element);
}

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    generateAndAddTodo(item);
  },
  containerSelector: ".todos__list",
});
section.renderItems();
const renderTodo = (item) => {
  generateAndAddTodo(item);
};

addTodoButton.addEventListener("click", () => {
  openModal(addTodoPopupEl);
});

//POPWithForm instance
const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (values) => {
    renderTodo(values);
    todoCounter.updateTotal(true);
    formValidation.resetValidation();
  },
});
addTodoPopup.setEventListeners();
// formValidation
const formValidation = new FormValidator(
  validationConfig,
  addTodoPopup.getForm()
);
formValidation.enableValidation();

const openModal = () => {
  addTodoPopup.open();
};
export { validationConfig };
