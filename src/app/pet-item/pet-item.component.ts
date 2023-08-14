import { ActivatedRoute, Router } from '@angular/router';
import { MypetsService } from '../service/mypets.service';
import { Pet, User } from './../model/mypets.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-item',
  templateUrl: './pet-item.component.html',
  styleUrls: ['./pet-item.component.css']
})
export class PetItemComponent implements OnInit {

  pet: Pet = new Pet();
  user: User [] = [];
  petId: number = -1;

  userFirstName: string = '';
  userLastName: string = '';

  constructor(private service: MypetsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.petId = params['id'];
      this.getPet()
      this.getUsers()
    })
  }

  getPet () :void {
    let id:number = this.petId;
    this.service.getPet(id).subscribe({
      next: (data:Pet) => {
        this.pet = data
        console.log(data);
      }
    })
  }

  getUsers() : void {
    this.service.getUsers().subscribe({
      next: (data:User[]) => {
        this.user = data
        for(let item of data) {
          if(this.pet.registration === item._id) {
            console.log(this.pet.registration, item._id);
            this.userFirstName = item.firstName;
            this.userLastName = item.lastName;
          }
        }
      }
    })
  }

}
