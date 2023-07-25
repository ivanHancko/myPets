import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Pet, SlideShow } from 'src/app/model/mypets.model';
import { MypetsService } from 'src/app/service/mypets.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  slides: SlideShow[] = [];
  constructor(private service: MypetsService) { }

  ngOnInit(): void {
    this.getSlide()
  }
  getSlide(): void {
    this.service.getSlideShow().subscribe({
      next: (slideShow: SlideShow[]) => {
        this.slides = slideShow;
      },
      error: (err: any) => {
        console.log('error: ', err);
      },
    });
  }

}
