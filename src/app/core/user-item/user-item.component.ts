import { Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet, User } from 'src/app/model/mypets.model';
import { MypetsService } from 'src/app/service/mypets.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {
@Input() user: User = new User();
pet: Pet = new Pet();

pets: Pet [] = [];

userId: number =-1;
petId: number =-1;
visible:boolean = false
showText: boolean = false;
errorText: boolean = false;
firstName: string = ""
lastName: string = "";
_email: string = "";
petsName: string = "";
petsCategory: string = "";
petsBreed: string = "";
petsGender: string = "";
petsAge: number = NaN;
_age: string = "";
_gender: string = "";


form: FormGroup = new FormGroup ({
  name: new FormControl('', [Validators.required]),
  category: new FormControl('', [Validators.required]),
  breed: new FormControl('', [Validators.required]),
  gender: new FormControl('', [Validators.required]),
  age: new FormControl(0, [Validators.required]),
  registration: new FormControl(0, [Validators.required]),
})


get name() { return this.form.get("name"); }
get category() { return this.form.get("category"); }
get breed() { return this.form.get("breed"); }
get gender() { return this.form.get("gender"); }
get age() { return this.form.get("age"); }
get registration() { return this.form.get("registration"); }


  constructor(private service: MypetsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe((params: any) => {
      this.userId = params['id'];
      this.petId = this.userId
      this.getUser()
      this.getPets()
      this.getPet()
    })
  }

  getPets() : void {
    this.service.getPets().subscribe({
      next: (data:Pet[]) => {
        this.pets = data

        for(let item of data) {
          if(this.user._id === item.registration) {

            console.log(this.user._id, item.registration);

            this.showText= true
            this.petsName = item.name;
            this.petsCategory = item.category;
            this.petsBreed = item.breed;
            this.petsGender = item.gender;
              if(item.gender == "Muški"){
                this._gender = "On"
              }else{
                this._gender = "Ona"
              }

            this.petsAge = item.age;
              if(item.age == 1) {
                this._age = "godinu"
              }else if (item.age >=2) {
                this._age = "godine"
              }else if(item.age >=5) {
                this._age = "godina"
              }

            console.log(data);

          }
        }
      }
    })
  }

  getUser(): void {
    this.service.getOne(this.userId).subscribe({
      next: (data: User) => {
        console.log(data);
        this.user = data
      }
    })
  }

  getPet () :void {
    let id:number = this.userId
    if(id){
      this.service.getPet(id).subscribe({
        next: (data:Pet) => {
          console.log(data);
          let pet: Pet = new Pet(data)
          this.form.patchValue(pet)
        }
      })
    }
  }

  updatePet(): void {
    let pet: Pet = new Pet(this.form.value)
    console.log(this.pet._id);

    for(let item of this.pets) {
      if(this.user._id == item.registration){
        let id: number = item._id
        this.errorText = false;
        if (id) {
          pet._id = id;
          if(this.registration?.value != item.registration){
            alert('Molim unesite vaš ID broj!')
            console.log(this.registration?.value, item.registration);
            return;
          }else{
            this.service.update(pet).subscribe({
              next: (response: any) => {
                this.ngOnInit()
                this.visible = false
              }
            });
          }
        }
      }
    }
  }

addPet(): void {
  let pet: Pet = new Pet(this.form.value)

    if(this.registration?.value != this.user._id){
      alert('Molim unesite vaš ID broj!')
      console.log(this.registration?.value, this.user._id);
      return;
    }else{
    this.service.add(pet).subscribe({
      next :(book: any) => {
        console.log(book);
        this.ngOnInit()
        this.visible = false
        }
    });
    }

  }

  onclick() : void {
    this.visible = !this.visible
  }

}
