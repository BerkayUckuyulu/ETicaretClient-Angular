import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { AuthService } from 'src/app/services/common/auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userService: UserService, spinner: NgxSpinnerService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {
    super(spinner)
  }

  ngOnInit(): void {
  }

  async login(UsernameOrEmail: string, Password: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService.login(UsernameOrEmail, Password, () => {
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params => {
        debugger;
        const returnUrl: string = params["returnUrl"];
        if (returnUrl) {
          this.router.navigate([returnUrl]);
        }
      })
      this.hideSpinner(SpinnerType.BallAtom);
    });
  }
}
