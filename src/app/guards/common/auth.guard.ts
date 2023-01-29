import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base';
import { AuthService, _isAuthenticated } from 'src/app/services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router, private toastr: CustomToastrService, private spinner: NgxSpinnerService, private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    this.spinner.show(SpinnerType.BallAtom)
    // const token: string = localStorage.getItem("accessToken");

    // // const tokenDecode = this.jwtHelper.decodeToken(token);
    // // const token2 = this.jwtHelper.tokenGetter();
    // // const tokenExpirationDate = this.jwtHelper.getTokenExpirationDate(token);

    // let isExpired: Boolean = true;
    // try {
    //   isExpired = this.jwtHelper.isTokenExpired(token);

    // } catch {
    //   isExpired = true
    // }

    if (!_isAuthenticated) {
      debugger;
      this.router.navigate(["login"], { queryParams: { returnUrl: state.url } });
      this.toastr.message("Oturum açmanız gerekmektedir.", "Başarısız", {
        messageType: ToastrMessageType.Warning,
        position: ToastrPosition.TopRight
      })

    }
    this.spinner.hide(SpinnerType.BallAtom);

    return true;
  }

}
