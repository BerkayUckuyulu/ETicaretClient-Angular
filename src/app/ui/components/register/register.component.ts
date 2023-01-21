import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { User } from 'src/app/entities/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  frm: FormGroup;

  ngOnInit(): void {
    this.frm = this.formBuilder.group({
      adSoyad: ["", [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
      kullaniciAdi: ["", [Validators.required, Validators.maxLength(50), Validators.min(3)]],
      email: ["", [Validators.required, Validators.maxLength(50), Validators.min(3), Validators.email]],
      sifre: [""],
      sifreTekrari: [""]
    }, {
      validators: (group: AbstractControl): ValidationErrors | null => {
        let sifre = group.get("sifre").value;
        let sifreTekrari = group.get("sifreTekrari").value;
        return sifre === sifreTekrari ? null : { notSame: true };
      }
    })
  }

  get component() {
    return this.frm.controls;
  }

  submited: boolean = false;
  onSubmit(data: User) {
    debugger;
    this.submited = true;
    if (this.frm.invalid)
      return;
    debugger;
  }

}
