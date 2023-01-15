import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Base, SpinnerType } from 'src/app/base';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends Base implements OnInit {
  constructor(
    private alertify: AlertifyService,
    public spinnerService: NgxSpinnerService
  ) {
    super(spinnerService);
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.SquareJellyBox);
  }

  m() {
    this.alertify.message('Okey', {
      messageType: MessageType.Success,
      delay: 5,
    });
  }
  d() {
    this.alertify.dismiss();
  }
  o() {}
}
