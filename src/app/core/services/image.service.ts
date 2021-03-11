import { Injectable } from '@angular/core';

import { ImageModel } from './../models/image-model';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private images: ImageModel[] = [];

  public get getImages(): ImageModel[] {
    return this.images;
  }

  constructor() { }

  public addImage(name: string, src: string): void {
    this.images.push({ id: (this.images.length + 1), name: `${name} ${(this.images.length + 1)}`, src });
  }

  public updateImage(id: number, name: string, src: string): void {
    this.images.splice(this.images.findIndex(i => i.id === id), 1, { id, name, src });
  }

  public getImage(id: number): ImageModel {
    return this.images.find(i => i.id === id);
  }

  public delete(id: number): void {
    this.images.splice(this.images.findIndex(i => i.id === id), 1);
  }

}
