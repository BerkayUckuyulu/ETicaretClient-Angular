import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { FileUploadOptions } from 'src/app/services/common/file-upload/file-upload.component';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/base-dialog';

declare var $: any;

@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss'],
})
export class SelectProductImageDialogComponent
  extends BaseDialog<SelectProductImageDialogComponent>
  implements OnInit {
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService, private spinner: NgxSpinnerService
  ) {
    super(dialogRef);
  }

  images: List_Product_Image[];

  async ngOnInit() {
    this.spinner.show(SpinnerType.BallAtom),
      this.images = await this.productService.readImages(this.data as string, () => {
        this.spinner.hide(SpinnerType.BallAtom)
      });
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png, .jpeg, .jpg, .gif',
    action: 'upload',
    controller: 'products',
    explanation: 'Ürün Resmini Seçiniz veya Sürükleyiniz.',
    isAdminPage: true,
    queryString: `id=${this.data}`,
  };

  async deleteImage(imageId: string) {
    this.spinner.show(SpinnerType.BallAtom)
    await this.productService.deleteImage(this.data as string, imageId, () => {
      this.spinner.hide(SpinnerType.BallAtom)
    })
  }
}

export enum SelectProductImageState {
  Close,
}
