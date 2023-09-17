import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css'],
})
export class PaginationComponent implements OnInit {
  @Input() page: number = 0;
  @Input() pageSize: number = 5;
  @Input() collectionSize: number = 10;

  @Output() pageChange: EventEmitter<number> = new EventEmitter();
  @Output() pageSizeChange: EventEmitter<number> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onPageChanged(newPage: number) {
    this.pageChange.emit(newPage);
  }

  onPageSizeChanged(newPageSize: number) {
    this.pageSizeChange.emit(newPageSize);
  }
}
