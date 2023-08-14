import { Component, Input, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pet, User } from 'src/app/model/mypets.model';
import { PetItemComponent } from 'src/app/pet-item/pet-item.component';
import { MypetsService } from 'src/app/service/mypets.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {

user: User = new User();

pet: Pet = new Pet();

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


  constructor(private service: MypetsService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

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
        console.log(data);
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

  openMenu(): void {

    const modalRef = this.modalService.open(PetItemComponent);
    modalRef.componentInstance.pet = this.pet;
    console.log(this.pet, this.pets);

  }

}
