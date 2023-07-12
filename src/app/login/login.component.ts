import { Component, OnInit } from '@angular/core';
import { MypetsService } from '../service/mypets.service';
import { Cake, User } from '../model/mypets.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: MypetsService, private modalService: NgbModal, private route: ActivatedRoute, private router: Router) { }

user: User[] = []
userId: number = 0;
firstName: string = ""
LastName: string = "";
_email: string = "";



form: FormGroup = new FormGroup ({
  email: new FormControl('', [Validators.required]),
  password: new FormControl('', [Validators.required])
})

get email() {
  return this.form.get('email')
}
get password() {
  return this.form.get('password')
}

  ngOnInit(): void {
  }

  getUser(): void {
    this.service.getUsers().subscribe({
      next: (data: User[]) =>{
        for (let i of data) {
          if (i.email == this.form.value.email && i.password == this.password?.value){
            this.firstName = i.firstName
            this.LastName = i.lastName
            this._email = this.form.value.email
          }
        }
      this.form.reset()
      }
    })
  }
}
