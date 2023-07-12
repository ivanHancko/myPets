import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Cake, User } from 'src/app/model/mypets.model';
import { MypetsService } from 'src/app/service/mypets.service';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.css']
})
export class UserItemComponent implements OnInit {



  constructor() { }

  ngOnInit(): void {

  }



}
