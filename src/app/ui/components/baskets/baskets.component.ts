import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Base } from 'src/app/base';
import { AlertifyService } from 'src/app/services/admin/alertify.service';

@Component({
  selector: 'app-baskets',
  templateUrl: './baskets.component.html',
  styleUrls: ['./baskets.component.scss']
})
export class BasketsComponent extends Base implements OnInit {

  constructor(private alertify: AlertifyService, public spinnerService: NgxSpinnerService) {
    super(spinnerService)
  }
  ngOnInit(): void {
    this.spinnerService.show();

  }

}
