import {
  Component,
  inject,
  Input,
  OnInit,
} from '@angular/core';
import {MatDialogRef, MatDialogModule, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Photo} from "../photo";
import {NgIf} from "@angular/common";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {PhotosService} from "../photos.service";

@Component({
  imports: [
    MatDialogModule,
    MatButtonToggleModule,
    NgIf,
    FormsModule,
    MatButtonModule,
  ],
  standalone: true,
  selector: 'app-modal',
  template: `
    <div id="modal-content-wrapper">
      <img [src]="photo.url" [width]="600" [height]="600" [alt]="photo.title" [title]="photo.title">
      <div id="photo-details">
        <p *ngIf="!isEditing" id="photo-title">{{photo.title}}</p>
        <textarea *ngIf="isEditing" id="photo-title-textbox" [(ngModel)]="photo.title">{{photo.title}}</textarea>
        <div id="buttons">
          <button #editButton mat-stroked-button id="edit-button" (click)="toggleEditMode()">Editing mode</button>
          <input #imageInput type="file" accept="image/*" (change)="uploadPhoto(imageInput)" hidden="hidden">
          <button mat-stroked-button id="upload-photo-button" (click)="imageInput.click()">Upload photo</button>
          <button mat-stroked-button color="warn" id="delete-button" (click)="deletePhoto()">Delete photo</button>
        </div>
      </div>
      <!--      <footer id="modal-footer">-->
      <!--        <button mat-raised-button id="modal-close-button" (click)="closeModal()">Close</button>-->
      <!--      </footer>-->
    </div>
  `,
  styleUrls: ['./modal.component.css']
})


export class ModalComponent implements OnInit {
  @Input() photo: Photo = inject(MAT_DIALOG_DATA);

  constructor(public dialogRef: MatDialogRef<ModalComponent>, private photosService: PhotosService) {
  }

  uploadPhoto(imageInput: HTMLInputElement) {
    console.log('OK');
    const file = imageInput.files![0];
    const reader = new FileReader();

    reader.addEventListener('load', ev => {
      let b64data = reader.result ?? "";
      if (typeof b64data != 'string')
        b64data = btoa(String.fromCharCode(...new Uint8Array(b64data)));
      this.photosService.updatePhoto(this.photo, b64data);
    });
    if (file) reader.readAsDataURL(file);
  }


  ngOnInit(): void {
  }

  isEditing = false;

  toggleEditMode() {
    if (this.isEditing) {
      this.photo.title = document.getElementById("photo-title-textbox")!.textContent!;
      console.log(this.photo.title)
    }
    this.isEditing = !this.isEditing;
  }

  deletePhoto() {
    this.dialogRef.close();

    if (confirm('Are you sure you want to delete this photo?'))
      this.photosService.deletePhoto(this.photo);
  }

}

