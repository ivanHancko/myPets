import { ActivatedRoute, Router } from '@angular/router';
import { MypetsService } from '../service/mypets.service';
import { Pet, User } from './../model/mypets.model';
import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-pet-item',
  templateUrl: './pet-item.component.html',
  styleUrls: ['./pet-item.component.css']
})
export class PetItemComponent implements OnInit {

  @Input() pet: Pet = new Pet();
  user: User [] = [];

  userFirstName: string = '';
  userLastName: string = '';
  age: string = '';

  constructor(private service: MypetsService, private route: ActivatedRoute, private router: Router, private modalService: NgbModal) { }

  ngOnInit(): void {
      this.getUsers()
  }


  getUsers() : void {
    this.service.getUsers().subscribe({
      next: (data:User[]) => {
        this.user = data
        for(let item of data) {
          if(this.pet.registration === item._id) {
            this.userFirstName = item.firstName;
            this.userLastName = item.lastName;
          }
          if(this.pet.age < 2) {
            this.age = "godinu";
          }else if (this.pet.age < 5) {
            this.age = "godine";
          }else {
            this.age = "godina";
          }
        }
      }
    })
  }

  openMenu(): void {
    const modalRef = this.modalService.open(PetItemComponent);
    modalRef.componentInstance.pet = this.pet;
  }
}
