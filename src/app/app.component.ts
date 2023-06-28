import {Component} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {MatButtonModule} from "@angular/material/button";
import {PhotosService} from "./photos.service";

// import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HomeComponent,
    MatButtonModule,
    // RouterLink,
    // RouterOutlet,
  ],
  template: `
    <main>
      <header class="logo">
        <p>Microgram</p>
        <button id="add-photo-button"
                mat-flat-button color="accent"
                (click)="addNewPhoto()">
          Add new photo
        </button>
      </header>
      <section class="content">
        <app-home></app-home>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private photosService: PhotosService) {
  }

  addNewPhoto() {
    this.photosService.createPhoto();
  }
}
