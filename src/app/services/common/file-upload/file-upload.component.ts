import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { FileUploadDialogComponent, FileUploadState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';
import { AlertifyService, MessageType, Position } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  constructor(private httpClientService: HttpClientService, private alertfiyService: AlertifyService, private toastrService: CustomToastrService, private dialog: MatDialog, private dialogService: DialogService) {

  }

  public files: NgxFileDropEntry[];
  @Input() options: Partial<FileUploadOptions>;
  x: any;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;
    const fileData: FormData = new FormData();
    debugger;
    this.x = this.options;
    for (const file of files) {

      (file.fileEntry as FileSystemFileEntry).file((_file: File) => {
        fileData.append(_file.name, _file, file.relativePath)
      });
    }
    this.dialogService.openDialog({
      componentType: FileUploadDialogComponent,
      data: FileUploadState.Yes,
      afterClosed: () => {
        this.httpClientService.post({
          controller: this.options.controller,
          action: this.options.action,
          queryString: this.options.queryString,
          headers: new HttpHeaders({ "responseType": "blob" }),
        }, fileData).subscribe(data => {
          if (this.options.isAdminPage) {
            this.alertfiyService.message("Dosyalar başarıyla yüklenmiştir.",
              {
                dismissOthers: true,
                messageType: MessageType.Success,
                position: Position.TopRight
              })

          }
          else {

            this.toastrService.message("Başarı ile yüklenmiştir.", "Başarılı", {
              messageType: ToastrMessageType.Success,
              position: ToastrPosition.TopRight,

            }

            )

          }

        }, (errorResponse: HttpErrorResponse) => {
          if (this.options.isAdminPage) {
            this.alertfiyService.message("Dosyalar  yüklenemedi.",
              {
                dismissOthers: true,
                messageType: MessageType.Error,
                position: Position.TopRight
              })

          }
          else {

            this.toastrService.message("Dosyalar yüklenemedi.", "Başarısız", {
              messageType: ToastrMessageType.Error,
              position: ToastrPosition.TopRight,

            }

            )

          }
        });
      }

    })


  }

  // openDialog(callBackDelete: () => any): void {
  //   const dialogRef = this.dialog.open(FileUploadDialogComponent, {
  //     width: '250px',
  //     data: FileUploadState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result == FileUploadState.Yes) {
  //       callBackDelete();
  //     }
  //   });
  // }

}

export class FileUploadOptions {
  controller?: string;
  action?: string;
  queryString?: string;
  explanation?: string;
  accept?: string;
  isAdminPage?: boolean = false;
}
