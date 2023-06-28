export class Photo {
  constructor(public title: string, public url: string, public thumbnailUrl?: string) {
    this.title = title;
    this.url = url;
    this.thumbnailUrl = thumbnailUrl ?? url;
  }
}
