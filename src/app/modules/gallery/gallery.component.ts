import { ImageService } from './../../core/services/image.service';
import { Component, OnInit } from '@angular/core';
import { ImageModel } from 'src/app/core/models/image-model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {

  public images: ImageModel[];

  constructor(private imageService: ImageService) { }

  ngOnInit(): void {
    this.images = this.imageService.getImages;
  }

  public delete(id: number): void {
    this.imageService.delete(id);
  }
}
