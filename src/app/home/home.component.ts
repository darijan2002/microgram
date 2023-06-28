import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ThumbnailComponent} from '../thumbnail/thumbnail.component';
import {Photo} from '../photo';
import {PhotosService} from '../photos.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ThumbnailComponent,
  ],
  template: `
    <section>
    </section>
    <section class="results">
      <app-thumbnail
        *ngFor="let photo of photos"
        [photo]="photo">
      </app-thumbnail>
    </section>
  `,
  styleUrls: ['./home.component.css'],
})

export class HomeComponent {
  photos: Photo[] = [];

  constructor(private photosService: PhotosService) {
    photosService.getFirstPhotos(100).then((photos: Photo[]) => {
      this.photos = photos;
    });

    photosService.photoDeleted$.subscribe(
      photoToDelete => {
        this.photos.splice(
          this.photos.indexOf(photoToDelete),
          1
        );
      }
    );
    photosService.photoAdded$.subscribe(
      addedPhoto => {
        this.photos.splice(0, 0, addedPhoto);
      }
    );
  }

}
