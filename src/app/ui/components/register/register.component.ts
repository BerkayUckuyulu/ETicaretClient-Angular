import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: CustomToastrService) { }

  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      nameSurname: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      userName: ["", [Validators.required, Validators.maxLength(50), Validators.min(3)]],
      email: ["", [Validators.required, Validators.maxLength(50), Validators.min(3), Validators.email]],
      password: [""],
      passwordConfirm: [""]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("password").value;
        let sifreTekrari = group.get("passwordConfirm").value;
        return sifre === sifreTekrari ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.frm.controls;
  }

  submited: boolean = false;
  async onSubmit(user: User) {
    this.submited = true;
    if (this.frm.invalid)
      return;

    const result: Create_User = await this.userService.create(user);

    if (result.succeeded)
      this.toastrService.message(result.message, "Başarılı", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight });
    else
      this.toastrService.message(result.message, "Hata", { messageType: ToastrMessageType.Error, position: ToastrPosition.TopRight });


  }

}
