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

export class Pet {
  _id: number;
  name: string;
  category: string;
  breed: string;
  gender: string;
  age: number;
  registration: number;

  constructor(obj?:any) {
    this._id = obj && obj._id || 0;
    this.name = obj && obj.name || "";
    this.category = obj && obj.category || "";
    this.breed = obj && obj.breed || "";
    this.gender = obj && obj.gender || "";
    this.age = obj && obj.age || 0;
    this.registration = obj && obj.registration || 0;
  }

}

export class SlideShow {
  _id: number;
  text: string;
  image: string;

  constructor(obj?: any) {
    this._id = (obj && obj._id) || 0;
    this.text = (obj && obj.text) || '';
    this.image = (obj && obj.image) || '';
  }
}

