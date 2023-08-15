import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Pet, User } from '../model/mypets.model';
import { MypetsService } from '../service/mypets.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  styleUrls: ['./pet-form.component.css']
})
export class PetFormComponent implements OnInit {

  user: User = new User();
@Input() pet: Pet = new Pet();

pets: Pet [] = [];

userId: number =-1;
petId: number =-1;
visible:boolean = false
showText: boolean = false;
errorText: boolean = false;
_email: string = "";
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


  constructor(private service : MypetsService, private route : ActivatedRoute, private router : Router) { }

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
            this.pet = item;
            this.showText= true
              if(item.age < 2) {
                this._age = "godinu"
              }else if (item.age < 5) {
                this._age = "godine"
              }else {
                this._age = "godina"
            }
          }
        }
      }
    })
  }

  getUser(): void {
    this.service.getOne(this.userId).subscribe({
      next: (data: User) => {
        this.user = data
      }
    })
  }


  getPet () :void {
    let id:number = this.pet._id
    if(id){
      this.service.getPet(id).subscribe({
        next: (data:Pet) => {
          console.log(data);
          this.pet = data;
          let pet: Pet = new Pet(data)
          this.form.patchValue(pet)
        }
      })
    }
  }

  updatePet(): void {
    let pet: Pet = new Pet(this.form.value)

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

                console.log(this.user._id);
                this.form.reset()
                window.location.reload()
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

        this.visible = false
        this.form.reset()
        window.location.reload()
        }
    });
    }
  }

  onclick() : void {
    this.visible = !this.visible
  }

}
