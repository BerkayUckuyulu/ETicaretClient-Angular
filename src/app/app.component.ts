import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private toastrService: CustomToastrService, public authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router) {
    authService.identityCheck();

    toastrService.message("selam", "berkay", { messageType: ToastrMessageType.Success, position: ToastrPosition.BottomLeft })
  }

  SignOut() {
    localStorage.removeItem("accessToken");
    this.authService.identityCheck();
    this.toastrService.message("Oturum Kapatılmıştır.", "Görüşmek Üzere", {
      messageType: ToastrMessageType.Success,
      position: ToastrPosition.TopRight
    })
  }
}

