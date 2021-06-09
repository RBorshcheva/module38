import { User } from "./models/User";

export const getFromStorage = function (key) {
  return JSON.parse(localStorage.getItem(key) || "[]");
};

export const addToStorage = function (obj, key) {
  const storageData = getFromStorage(key);
  storageData.push(obj);
  localStorage.setItem(key, JSON.stringify(storageData));
};

export const updateInToStorage = function (objIdkey, objIdValue, key, param, value) {
  const storageData = getFromStorage(key);
  if(storageData !== null)
  {
    storageData.forEach(element => {
      if(element[objIdkey] == objIdValue)
      {
        element[param] = value;
        localStorage.setItem(key, JSON.stringify(storageData));
        return;
      };
    });    
  }
};

export const generateUser = function (user) {
 JSON.stringify(user); 
  User.save(user);
};

export const getTasksFromStorage = function (user, listNum) {
  let allTasks = JSON.parse(localStorage.getItem("task") || "[]");
  let returnList = [];

  allTasks.forEach(element => {
    if(element.user == user && element.type==listNum){
      returnList.push(element);
    };
  });
  return returnList;
};