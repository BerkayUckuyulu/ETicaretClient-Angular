import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Base } from 'src/app/base';
import { AlertifyService } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends Base implements OnInit {

  constructor(private alertify: AlertifyService, public spinnerService: NgxSpinnerService) {
    super(spinnerService)
  }
  ngOnInit(): void {
    this.spinnerService.show();

  }

}
