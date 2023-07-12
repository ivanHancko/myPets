export class User {
  _id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;

  constructor(obj?:any) {
    this._id = obj && obj._id || 0;
    this.firstName = obj && obj.firstName || "";
    this.lastName = obj && obj.lastName || "";
    this.email = obj && obj.email || "";
    this.password = obj && obj.password || "";
  }
}

export class Cake {


  _id: number;
  name: string;
  ingredients:string;
description: string;
origin:string;

constructor(obj?:any) {
  this._id = obj && obj._id || 0;
  this.name = obj && obj.name || "";
  this.ingredients = obj && obj.ingredients || "";
  this.description = obj && obj.description || "";
  this.origin = obj && obj.origin || "";
}
}
