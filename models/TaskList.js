import { Task } from "./Task";
import { updateInToStorage } from "../utils";

export class TaskList {
    constructor(user, status, htmlObj) {
        this.user = user;
        this.status = status;
        this.htmlObj = htmlObj;
        this.tasks = [];  
    }

    viewTasks(){
        let taskListHtml = '';
        this.tasks.forEach(task => {
            taskListHtml = taskListHtml +
            `<div class="row" id="task">
                <h3 class="task" guid="${task.getId()}">${task.getText()}</h3>
             </div>`;
        });
        this.htmlObj.innerHTML = taskListHtml;
    }

    getTasks()
    {
        return this.tasks;
    }

    taskCount()
    {
        return this.tasks.length;
    }

    SetNewTask(taskText)
    {
        if (taskText.lenght == 0)
        {
            taskText = 'Не было задано';
        }
        let newTask = new Task(null, taskText, this.user, this.status);
        this.tasks.push(newTask);
        return newTask;
    }

    SetTasks(taskList)
    {
        console.log(taskList.lenght);
        taskList.forEach(task => {                   
            let newTask = new Task(task.id,task.text,task.user,task.type);
            this.tasks.push(newTask);
        });
    }

    SetExistTask(task)
    {
        task.setType(this.status);
        this.tasks.push(task);
        updateInToStorage("id", task.getId(), task.getStorageKey(), "type",this.status);
        return true;
    }

    removeTask(guid)
    {
        let i = 0;
        this.tasks.forEach(task => {
            if(task.getId() == guid)
            {
                this.tasks.splice(i,1);
            }
            i++;
        }); 
    }

    findByGuid(guid)
    {
       let taskToReturn = null;
        this.tasks.forEach(task => {
            if(task.getId()==guid)
            {
                taskToReturn = task;
            }
        }); 
        return taskToReturn;       
    }


}