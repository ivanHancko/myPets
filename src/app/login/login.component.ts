import { Component, Input, OnInit, Output } from '@angular/core';
import { MypetsService } from '../service/mypets.service';
import { User } from '../model/mypets.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: MypetsService, private router: Router) { }

user: User[] = []
userId: number = 0;
ifLogged: boolean = true;
url: any = document.getElementById("login");
form: FormGroup = new FormGroup ({
  email: new FormControl('', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
  password: new FormControl('', [Validators.required])
})

get email() {
  return this.form.get('email')
}
get password() {
  return this.form.get('password')
}

  ngOnInit(): void {
    this.url.innerHTML = 'Prijava'
  }





  getUser(): void {
    this.service.getUsers().subscribe({
      next: (data: User[]) =>{
        for (let i of data) {
          if (i.email === this.form.value.email && i.password === this.password?.value){
            this.ifLogged = true;
            this.form.reset()
            this.router.navigate(['/user/', i._id]);
            return
          }else{
            this.ifLogged = false;
          }
        }
      }
    })
  }

}


