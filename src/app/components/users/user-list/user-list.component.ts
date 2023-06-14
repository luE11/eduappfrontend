import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pageable } from 'src/app/interfaces/pageable';
import { Person } from 'src/app/interfaces/person';
import { UserSpec } from 'src/app/interfaces/user-spec';
import { UserArray } from 'src/app/interfaces/users/userArray';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  readonly pageSize: number = 10;
  readonly consultUserURL: string = "/user/"

  /** Structure: "field,direction" direction is "ASC or DESC" */
  sort: string = "firstName,DESC";
  activePage : number = 1;
  numberOfPages: number = 1;
  totalRecords: number = 0;
  userSpec : UserSpec = { };
  userList : Person[] = [];
  selectedRow : number = 0;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private userService: UserService){ }
  
  ngOnInit(): void {
    this.initQueryParams();
    this.fetchUsers();
  }

  initQueryParams(){
    let params = this.route.snapshot.queryParams
    this.activePage = (params['page']) ?? this.activePage;
    this.sort = (params['sort']) ?? this.sort;
    if(params['firstName']!=null || params['lastName']!=null || params['email']!=null){
      this.userSpec = {
        ...this.userSpec, firstName: params['firstName'], lastName: params['lastName'], email: params['email']
      }
    }
  }

  setPage(newPage: number){
    this.activePage = newPage;
    this.updateParams(newPage = newPage);
  }

  setSpec(spec: UserSpec){
    this.userSpec = spec
    this.updateParams(null, null, this.userSpec)
  }

  updateParams(newPage: number | null = null, newOrder: string | null = null, userSpec: UserSpec | null = null){
    let params : Record<string, any> = {
      page: (newPage != null) ? newPage : this.activePage,
      sort: (newOrder != null) ? newOrder : this.sort
    }
    if(this.userSpec.email) params['email'] = this.userSpec.email;
    if(this.userSpec.firstName) params['firstName'] = this.userSpec.firstName;
    if(this.userSpec.lastName) params['lastName'] = this.userSpec.lastName;

    if(userSpec!=null){
      if(userSpec.email) params['email'] = userSpec.email;
      if(userSpec.firstName) params['firstName'] = userSpec.firstName;
      if(userSpec.lastName) params['lastName'] = userSpec.lastName;
    }

    this.router.navigate( // TODO:  Insert user
      [],
      {
        relativeTo: this.route,
        queryParams: params
      });
    this.fetchUsers();
  }

  fetchUsers() {
    let pageable : Pageable = {
      page: this.activePage,
      size: this.pageSize,
      sort: [this.sort]
    }

    let spec : UserSpec = {}
    if(this.userSpec.email) spec.email = this.userSpec.email
    if(this.userSpec.firstName) spec.firstName = this.userSpec.firstName
    if(this.userSpec.lastName) spec.lastName = this.userSpec.lastName

    this.userService.getUsers(spec, pageable)
      .subscribe({
        next: (users : UserArray ) => this.setUsers(users),
        error: function (err) {
          console.log(err);
        }
      })
  }

  setUsers(users: UserArray){
    this.userList = users.personList;
    this.totalRecords = users.totalRecords;
    this.numberOfPages = users.totalPages;
  }

  orderBy(attribute: string){
    let sortSplit = this.sort.split(",");
    let direction = "DESC";
    if(attribute === sortSplit[0])
      direction = (sortSplit[1]==="DESC")?"ASC":"DESC";
    this.sort = `${attribute},${direction}`;
    this.updateParams(null, this.sort);
  }

  setSelected(row: number) {
    if(this.selectedRow !== row)
      this.selectedRow = row;
    else
      this.selectedRow = 0;
  }

  // Paginate user list
}
