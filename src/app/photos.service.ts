import {Injectable} from '@angular/core';
import {Photo} from './photo';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PhotosService {
  async getFirstPhotos(n: number): Promise<Photo[]> {
    const url = 'https://jsonplaceholder.typicode.com/photos';
    const data = await fetch(url);
    return (await data.json() ?? []).slice(0, n);
  }

  private photoDeleted = new Subject<Photo>();
  private photoAdded = new Subject<Photo>();
  photoDeleted$ = this.photoDeleted.asObservable();
  photoAdded$ = this.photoAdded.asObservable();

  deletePhoto(photo: Photo): void {
    this.photoDeleted.next(photo);
  }

  createPhoto() {
    this.photoAdded.next(new Photo("new title", ""));
  }

  updatePhoto(p: Photo, b64data: string) {
    p.url = p.thumbnailUrl = b64data;
  }
}
