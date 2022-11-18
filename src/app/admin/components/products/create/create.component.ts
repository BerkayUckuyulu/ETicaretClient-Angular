import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { Create_Product } from 'src/app/contracts/create_product';
import { AlertifyService, MessageType, Position } from 'src/app/services/admin/alertify.service';
import { ProductService } from 'src/app/services/common/models/product.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent implements OnInit {

  constructor(private productService: ProductService, spinner: NgxSpinnerService, private alertify: AlertifyService) {
    super(spinner)
  }

  ngOnInit(): void {
  }
  @Output() createdProduct: EventEmitter<null> = new EventEmitter();

  create(name: HTMLInputElement, stock: HTMLInputElement, price: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    const createProduct: Create_Product = new Create_Product();

    createProduct.name = name.value;
    createProduct.price = parseInt(price.value);
    createProduct.stock = parseFloat(stock.value);

    this.productService.create(createProduct, () => {
      this.hideSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
      this.alertify.message("Başarıyla Eklendi", { messageType: MessageType.Success, position: Position.TopRight, dismissOthers: true });

      this.createdProduct.emit();

    }, errorMessage => {
      this.alertify.message(errorMessage, {
        dismissOthers: true,
        messageType: MessageType.Error,
        position: Position.TopRight
      });
    });

  }
}
