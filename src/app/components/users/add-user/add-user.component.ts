import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { arrayLengthValidator, dateLowerThanValidator, valueNotInArrayValidator } from 'src/app/utils/custom-validators';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  addForm!: FormGroup;

  constructor(private userService: UserService,
    private titleService: Title,
    private router: Router,
    private formBuilder: FormBuilder) {
    }

  ngOnInit(): void {
    this.titleService.setTitle('eduapp | Add user');
    this.initializeFormGroup()
  }

  initializeFormGroup(){
    this.addForm = this.formBuilder.group({
      roles: this.formBuilder.array([], [
        Validators.required,
        arrayLengthValidator(1)
      ]),
      programmeId: this.formBuilder.control(0, [
        valueNotInArrayValidator([0])
      ]),
      firstName: this.formBuilder.control('', [
        Validators.required
      ]),
      lastName: this.formBuilder.control('', [
        Validators.required
      ]),
      birthDate: this.formBuilder.control(new Date(), [
        Validators.required,
        dateLowerThanValidator(new Date())
      ]),
      email: this.formBuilder.control( '' , [
        Validators.required,
        Validators.email
      ]),
      phoneNumber: this.formBuilder.control('', [
        Validators.minLength(6)
      ]),
      address: this.formBuilder.control('', [
        Validators.minLength(6)
      ])
    });
  }

}
