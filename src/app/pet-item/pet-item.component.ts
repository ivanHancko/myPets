import { Pet, User } from './../model/mypets.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pet-item',
  templateUrl: './pet-item.component.html',
  styleUrls: ['./pet-item.component.css']
})
export class PetItemComponent implements OnInit {

  @Input() user : User = new User();
  @Input() pet: Pet = new Pet();

  constructor() { }

  ngOnInit(): void {
  }

}
