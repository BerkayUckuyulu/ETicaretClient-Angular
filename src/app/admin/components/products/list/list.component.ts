import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxSpinnerService } from 'ngx-spinner';
import { Base, SpinnerType } from 'src/app/base';
import { BaseComponent } from 'src/app/base/base.component';
import { List_Product } from 'src/app/contracts/list_products';
import { SelectProductImageDialogComponent } from 'src/app/dialogs/select-product-image-dialog/select-product-image-dialog.component';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { ProductService } from 'src/app/services/common/models/product.service';

declare var $: any;

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent extends Base implements OnInit {
  constructor(
    private productService: ProductService,
    spinner: NgxSpinnerService,
    private alertifyService: AlertifyService,
    private dialogService: DialogService
  ) {
    super(spinner);
  }

  displayedColumns: string[] = [
    'name',
    'stock',
    'price',
    'createdDate',
    'updatedDate',
    'edit',
    'photos',
    'delete',
  ];
  dataSource: MatTableDataSource<List_Product> = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  async getProducts() {
    this.showSpinner(SpinnerType.SquareJellyBox);
    const allProducts: { totalCount: number; products: List_Product[] } =
      await this.productService.read(
        this.paginator ? this.paginator.pageIndex : 0,
        this.paginator ? this.paginator.pageSize : 5,
        () => this.hideSpinner(SpinnerType.SquareJellyBox),
        (errorMessage) => {
          this.alertifyService.message(errorMessage, {
            dismissOthers: true,
            messageType: MessageType.Error,
            position: Position.TopRight,
          });
        }
      );
    this.dataSource = new MatTableDataSource<List_Product>(
      allProducts.products
    );
    this.paginator.length = allProducts.totalCount;
  }
  productImageDialogOpen(id: string) {
    this.dialogService.openDialog({
      componentType: SelectProductImageDialogComponent,
      data: id,
      options: {
        width: '1000px',
      },
    });
  }

  async pageChanged() {
    await this.getProducts();
  }

  async ngOnInit() {
    await this.getProducts();
  }

  // delete(id: string, event) {
  //   const img: HTMLImageElement = event.srcElement;

  //   $(img.parentElement.parentElement).fadeOut(1000);
  // }
}
