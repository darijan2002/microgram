import {AfterViewInit, Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Photo} from '../photo';
import {MatDialog, MatDialogConfig, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import {ModalComponent} from '../modal/modal.component';

@Component({
  selector: 'app-thumbnail',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
  ],
  template: `
    <section class="thumbnail">
      <a (click)="openModal()">
        <img class="thumbnail-photo" [src]="photo.thumbnailUrl" [width]="150" [height]="150"
             [alt]="photo.title"
             [title]="photo.title">
      </a>
    </section>
  `,
  styleUrls: ['./thumbnail.component.css'],
})

export class ThumbnailComponent implements AfterViewInit {

  @Input() photo!: Photo;

  dialogConfig = new MatDialogConfig();
  modalDialog: MatDialogRef<ModalComponent> | undefined;

  constructor(public matDialog: MatDialog) {
  }

  ngAfterViewInit() {
    document.onclick = (args: any): void => {
      if (args.target.tagName === 'BODY') {
        this.modalDialog?.close()
      }
    }
  }

  openModal() {
    this.dialogConfig.id = "app-modal";
    this.dialogConfig.height = "600px";
    this.dialogConfig.width = "1000px";
    this.dialogConfig.enterAnimationDuration = 0;
    this.dialogConfig.exitAnimationDuration = 0;
    this.dialogConfig.data = this.photo;
    this.modalDialog = this.matDialog.open(ModalComponent, this.dialogConfig);
  }
}
