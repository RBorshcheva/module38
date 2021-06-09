import { v4 as uuid } from "uuid";

export class BaseModel {
  constructor() 
  {
    this.id = uuid();
  }
  updateUid(uid)
  {
    this.id = uid;
  }
}
