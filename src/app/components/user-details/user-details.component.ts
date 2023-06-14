import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/interfaces/person';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  person?: Person | null;

  public constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  public fetchUserDetails(){
    this.userService.getPersonDetails().subscribe({
      next: (person : Person) => this.person = person,
      error: (error) => console.log(error)
    })
  }

}
