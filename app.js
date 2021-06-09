import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import $ from 'jquery';

import "./styles/style.css";
import taskFieldTemplate from "./templates/taskField.html";
import noAccessTemplate from "./templates/noAccess.html";
import { User } from "./models/User";
import { generateUser } from "./utils";
import { State } from "./state";
import { authUser } from "./services/auth";
import { TaskController } from "./controllers/TaskController"
import { getTasksFromStorage } from "./utils"

export const appState = new State();

const loginForm = document.querySelector("#app-login-form");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const formData = new FormData(loginForm);
  const login = formData.get("login");
  const password = formData.get("password");

  let fieldHTMLContent = noAccessTemplate;
  document.querySelector("#content").innerHTML = noAccessTemplate;
  
  if(authUser(login, password))
  {
    fieldHTMLContent = taskFieldTemplate;
    document.querySelector("#content").innerHTML = taskFieldTemplate;
    const taskController = new TaskController(appState.currentUser.id, getTasksFromStorage(appState.currentUser.id, 0), getTasksFromStorage(appState.currentUser.id, 1), getTasksFromStorage(appState.currentUser.id, 2));
  }

});


