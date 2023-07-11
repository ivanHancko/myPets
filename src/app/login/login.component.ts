import { Component, OnInit } from '@angular/core';
import { MypetsService } from '../service/mypets.service';
import { User } from '../model/mypets.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SingupComponent } from '../singup/singup.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: MypetsService, private modalService: NgbModal) { }

user: User[] = []

  ngOnInit(): void {
    this.getUser()
  }

  getUser(): void {
    this.service.getUser().subscribe({
      next: (data: User[]) =>{
        console.log(data);
      }
    })
  }
  openSingUp(): void {
    const modalRef = this.modalService.open(SingupComponent);

  }

}
