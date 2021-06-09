import { TaskList }  from "../models/TaskList";

export class TaskController{
    constructor(user, readyList, inProgressList, finishedList) {
        this.user = user;
        this.readyBtn = document.querySelector(".addReady");
        this.progressBtn = document.querySelector(".addProgressDT");
        this.finishedBtn = document.querySelector(".addFinishedDT");
        this.addCardProgress = document.querySelector(".addProgress");
        this.addCardFinished = document.querySelector(".addFinished");

        this.readyListHtml = document.querySelector("#readyCol");
        this.inProgressListHtml = document.querySelector("#inProgressCol");        
        this.finishedListHtml = document.querySelector("#finishedCol");
        
        this.activeTasksP =  document.querySelector("#activeTasks");
        this.finishedTasksP = document.querySelector("#finishedTasks");   

        this.readyList = new TaskList(this.user, 0, this.readyListHtml);
        this.inProgressList = new TaskList(this.user, 1, this.inProgressListHtml);
        this.finishedList = new TaskList(this.user, 2, this.finishedListHtml);
        this.tasks = [];

        this.createLists(readyList, inProgressList, finishedList);
        this.checkDropDowns();
        this.updateStats();

        this.readyBtn.addEventListener('click', event => {
            this.getTaskName()
          });
    }   

    checkDropDowns() {
        this.readyList.taskCount() > 0 ? this.progressBtn.disabled = false : this.progressBtn.disabled = true;            
        this.inProgressList.taskCount() > 0 ? this.finishedBtn.disabled = false : this.finishedBtn.disabled = true; 
    }

    updateStats()
    {
        this.activeTasksP.innerHTML = "Active tasks:" + this.inProgressList.taskCount();
        this.finishedTasksP.innerHTML = "Finished tasks:" + this.finishedList.taskCount();        
    }

    SetNewTask(taskText)
    {
        let task = this.readyList.SetNewTask(taskText);
        this.readyList.viewTasks();
        let newTask = document.createElement("button");
        newTask.setAttribute("class", "dropdown-item addProgressElement");
        newTask.setAttribute("guid", task.getId());
        newTask.setAttribute("type", "button");
        newTask.textContent = task.getText();
        this.addCardProgress.appendChild(newTask);
        this.checkDropDowns();        
        document.querySelectorAll('.addProgressElement').forEach(item => {
            item.addEventListener('click', event => {
                this.IsInProgress(item.getAttribute('guid'),item);
            })
        })
    }

    getTaskName(){
        this.readyBtn.innerHTML = "Submit";
        let newTask = document.createElement("input");
        newTask.setAttribute("type", "text");
        newTask.setAttribute("class", "form-control-plaintext");
        newTask.setAttribute("id", "taskInput");
        this.readyListHtml.appendChild(newTask);        
        newTask.focus();

        newTask.addEventListener('focusout', (event) => {
            if(newTask.value.length > 0)
            {
                this.SetNewTask(newTask.value);
            }
            newTask.remove();
            this.readyBtn.innerHTML = "+ Add card";
        });
    }

    createLists(readyList, inProgressList, finishedList)
    {
        if(readyList !==null && Array.isArray(readyList) && readyList.length > 0)
        {
            this.readyList.appendTasks(readyList);
            this.readyList.viewTasks();
        }
        if(inProgressList !==null && Array.isArray(inProgressList) && inProgressList.length > 0)
        {
            this.inProgressList.appendTasks(inProgressList);
            this.inProgressList.viewTasks();
        }
        if(finishedList !==null && Array.isArray(finishedList) && finishedList.length > 0)
        {
            this.finishedList.appendTasks(finishedList);
            this.finishedList.viewTasks();
        }
    }

    IsInProgress(guid, item)
    {
        let taskToMove = this.readyList.findByGuid(guid);
        if(taskToMove !== null)
        {
            if(this.inProgressList.appendExistTask(taskToMove))
            {
                item.remove();
                this.readyList.removeTask(taskToMove.getId());
                this.readyList.viewTasks();
                this.inProgressList.viewTasks();
                let newTask = document.createElement("button");
                newTask.setAttribute("class", "dropdown-item addFinishedElement");
                newTask.setAttribute("guid", taskToMove.getId());
                newTask.setAttribute("type", "button");
                newTask.textContent = taskToMove.getText();
                this.addCardFinished.appendChild(newTask);
                this.updateStats();
                this.checkDropDowns();
                document.querySelectorAll('.addFinishedElement').forEach(item => {
                    item.addEventListener('click', event => {
                        this.IsFinished(item.getAttribute('guid'),item);
                    })
                })
            }
        }
    }
    IsFinished(guid, item)
    {
        let taskToMove = this.inProgressList.findByGuid(guid);
        if(taskToMove !== null)
        {
            if(this.finishedList.appendExistTask(taskToMove))
            {
                item.remove();
                this.inProgressList.removeTask(taskToMove.getId());
                this.inProgressList.viewTasks();
                this.finishedList.viewTasks();
                this.updateStats();
            }
        }       
    }
}