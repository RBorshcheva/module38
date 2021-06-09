import { v4 as uuid } from "uuid";
import {addToStorage } from "../utils";

export class Task {
    constructor(guid, taskText, user, type) {
      this.text = taskText;
      this.user = user;
      this.storageKey = "task";
      if (type == 1 || type == 2) 
      {
          this.type = type;
      }
      else
      {
        this.type = 0;
      }

      if(guid == null)
      {
        this.id = uuid();
        addToStorage(this, this.storageKey);
      }  else {
        this.id = guid;
      }      

      console.log(`set ${this.id}:${this.text}`);
    }

    getStorageKey(){
        return this.storageKey;
    }

    getId() {
        return this.id;
    }

    getText() {
        return this.text;
    }  
    
    getUser() {
        return this.user;
    }
    
    getType() {
        return this.type;       
    }

    setType(type){
        if (type != 0 || type != 1 || type != 2)
        {
            this.type = 0;
        } else {
            this.type = type;
        }
    }
}