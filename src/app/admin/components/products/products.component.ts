import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { Base, SpinnerType } from 'src/app/base';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService } from 'src/app/services/admin/alertify.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends Base implements OnInit {

  constructor(private alertify: AlertifyService, public spinnerService: NgxSpinnerService, private httpClientService: HttpClientService) {
    super(spinnerService)
  }
  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallAtom);

    // this.httpClientService.delete({ controller: "products" }, "6e4beda6-7eae-45e0-8018-5aa5e0f53b24").subscribe();

    // this.httpClientService.get<Product[]>({
    //   controller: "Products"
    // }).subscribe(data => {
    //   console.log(data[0].name);
    // });

    // this.httpClientService.post({
    //   controller: "products",
    // }, {
    //   name: "Kalem",
    //   stock: 100,
    //   price: 15
    // }).subscribe();

    // this.httpClientService.put({
    //   controller: "products"
    // }, {
    //   id: "6e4beda6-7eae-45e0-8018-5aa5e0f53b24",
    //   name: "renkli Kağıt",
    //   stock: 1500,
    //   price: 5.5
    // }).subscribe();

    // $.get("https://localhost:7183/api/Products", data => {
    //   console.log(data);
    // })

    // this.httpClientService.get({
    //   fullEndPoint: "https://jsonplaceholder.typicode.com/posts"
    // }).subscribe(data => console.log(data))








  }

}
