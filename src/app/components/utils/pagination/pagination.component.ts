import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {

  @Input() activePage: number = 1;
  @Input() numberOfPages: number = 1;
  @Output() setPageEvent = new EventEmitter<number>();
  @Input() totalRecords: number = 0;

  setPage(newPage: number){
    if(this.activePage !== newPage)
      this.setPageEvent.emit(newPage);
  }

}
