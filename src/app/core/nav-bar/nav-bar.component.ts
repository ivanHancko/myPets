import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/model/mypets.model';
import { MypetsService } from 'src/app/service/mypets.service';



@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user: User = new User();
  userId: number =-1;
  constructor(private service: MypetsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.userId = params['id'];

    })
  }
  getUser(): void {
    this.service.getOne(this.userId).subscribe({
      next: (data: User) => {
        console.log(data);
        this.user = data
      }
    })
  }

}
