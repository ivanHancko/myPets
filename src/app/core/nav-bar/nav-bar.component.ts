import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from 'src/app/login/login.component';
import { SingupComponent } from 'src/app/singup/singup.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {



  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }
  openSingUp(): void {
    const modalRef = this.modalService.open(SingupComponent);

  }
  openLogIn(): void {
    const modalRef = this.modalService.open(LoginComponent);

  }

}
