import { User } from './../model/mypets.model';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MypetsService } from '../service/mypets.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {

validPasswords = true;
idUser: number = 0;

item: User[] = [];
  constructor(private service: MypetsService,private modalService: NgbModal, private router: Router) { }

  form: FormGroup = new FormGroup ({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  })



  get firstName() {
    return this.form.get('firstName')
  }
  get lastName() {
    return this.form.get('lastName')
  }
  get email() {
    return this.form.get('email')
  }
  get password() {
    return this.form.get('password')
  }
  get confirmPassword() {
    return this.form.get('confirmPassword')
  }


  ngOnInit(): void {
  }


  addUser() : void {
    let users : User[] = []

    for (let item of users) {
      if(item.email == this.form.value.email) {
        this.validPasswords = false;
        }
    }

    if (this.password?.value != this.confirmPassword?.value) {
      this.validPasswords = false;
      return;
    }else{
    let user: User = new User(this.form.value)
    this.service.addUser(user).subscribe({
      next :(user: User) => {
        this.validPasswords = true;
        this.router.navigate(['/login']);
      }
    })

  }
  this.form.reset();
}


}
