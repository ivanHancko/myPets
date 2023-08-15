import { User } from './../model/mypets.model';
import { Component, OnInit } from '@angular/core';
import { MypetsService } from '../service/mypets.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.css']
})
export class SingupComponent implements OnInit {


isUser: boolean = true;
validPasswords: boolean = true;
idUser: number = 0;

item: User[] = [];

  constructor(private service: MypetsService, private router: Router) { }

  form: FormGroup = new FormGroup ({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
    password: new FormControl('', [Validators.required,  Validators.minLength(6)]),
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
    this.getUser()

  }


  addUser() : void {
for(let item of this.item) {
  if(item.email === this.email?.value){
    this.isUser = false;
    return
  }
}
    if (this.password?.value != this.confirmPassword?.value) {
      this.validPasswords = false;
      return;

    }else{
    let user: User = new User(this.form.value)
    this.service.addUser(user).subscribe({
      next :(user: User) => {
        this.isUser = true;
        this.validPasswords = true;
        this.router.navigate(['/login']);
      }
    })

  }
  this.form.reset();
}


getUser(): void {
  this.service.getUsers().subscribe({
    next: (data: User[]) =>{
     this.item = data
     console.log(data);

    }
  })
}

}
