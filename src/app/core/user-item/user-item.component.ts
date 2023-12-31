import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Pet, User } from 'src/app/model/mypets.model';
import { PetFormComponent } from 'src/app/pet-form/pet-form.component';
import { PetItemComponent } from 'src/app/pet-item/pet-item.component';
import { MypetsService } from 'src/app/service/mypets.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css'],
})
export class UserItemComponent implements OnInit {
  params = {
    page: 1,
    pageSize: 5,
  };

  user: User = new User();
  countPet: number = 0;
  @Input() pet: Pet = new Pet();
  pets: Pet[] = [];
  userId: number = -1;
  petId: number = -1;
  visible: boolean = false;
  showText: boolean = false;
  errorText: boolean = false;
  _email: string = '';
  _age: string = '';
  _gender: string = '';
  url: any = document.getElementById('login');
  check: any = document.getElementById('user');

  constructor(
    private service: MypetsService,
    private route: ActivatedRoute,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.userId = params['id'];
      this.getUser();
      this.getUsers();
      this.getPets();
      this.url.innerHTML = 'Odjavi se!';

      console.log(this.pets.length);
    });
  }

  getPets(): void {
    this.service.getPets(this.params).subscribe({
      next: (data: Pet[]) => {
        this.pets = data;

        for (let item of data) {
          if (this.user._id === item.registration) {
            this.pet = item;

            if (item.age < 2) {
              this._age = 'godinu';
            } else if (item.age < 5) {
              this._age = 'godine';
            } else {
              this._age = 'godina';
            }
          }
          if (this._age === '') {
            this.showText = true;
          } else {
            this.showText = false;
          }
        }
      },
    });
  }

  getUsers(): void {
    this.service.getUsers().subscribe({
      next: (data: User[]) => {
        this.countPet = data.length;
        console.log(this.countPet);
      },
    });
  }

  getUser(): void {
    this.service.getOne(this.userId).subscribe({
      next: (data: User) => {
        this.user = data;
      },
    });
  }

  onclick(): void {
    this.visible = !this.visible;
    const modalRef = this.modalService.open(PetFormComponent);
    modalRef.componentInstance.pet = this.pet;
    modalRef.componentInstance.user = this.user;
  }

  show(): void {
    this.visible = !this.visible;
    const modalRef = this.modalService.open(PetItemComponent);
    modalRef.componentInstance.pet = this.pets;
    modalRef.componentInstance.user = this.user;
  }

  onPageChanged(newPage: number): void {
    this.params.page = newPage;
    this.getPets();
  }

  onPageSizeChanged(newPageSize: number): void {
    this.params.pageSize = newPageSize + 5;
    this.params.page = 1;
    this.getPets();
  }
}
