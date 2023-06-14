import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserSpec } from 'src/app/interfaces/user-spec';

@Component({
  selector: 'app-user-list-filter',
  templateUrl: './user-list-filter.component.html',
  styleUrls: ['./user-list-filter.component.scss']
})
export class UserListFilterComponent implements OnInit {

  readonly ADD_USER_PATH : string = "/user/add";

  @Input() firstName: string | null | undefined = '';
  @Input() lastName: string | null | undefined = '';
  @Input() email: string | null | undefined = '';
  @Output() setSpecEvent = new EventEmitter<UserSpec>();
  userFilterForm!: FormGroup;

  ngOnInit(){
    this.userFilterForm = new FormGroup({
      firstName: new FormControl(this.firstName),
      lastName: new FormControl(this.lastName),
      email: new FormControl(this.email)
    });
  }

  get firstname() { return this.userFilterForm.get('firstname'); }
  get lastname() { return this.userFilterForm.get('lastname'); }
  // get email() { return this.userFilterForm.get('email'); } duplicado

  submit(event: Event){
    this.setSpecEvent.emit(this.userFilterForm.value);
  }

}
