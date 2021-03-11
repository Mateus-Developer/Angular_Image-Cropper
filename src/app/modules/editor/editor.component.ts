import { Component, ElementRef, OnInit, Renderer2, ViewChild, AfterViewInit, AfterViewChecked, AfterContentChecked, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import Cropper from 'cropperjs';

import { ImageModel } from 'src/app/core/models/image-model';
import { ImageService } from './../../core/services/image.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {

  public selectedFiles: FileList;
  public currentFile: File;
  public imagePreview: any;
  public cropper: Cropper;
  public slider = { max: 100, min: 0 };
  public imageSelected: ImageModel;
  public imageName = 'Image';
  public isUpdate = false;

  @ViewChild('imgPreviewElement', { static: false }) imagePreviewElement: ElementRef<HTMLImageElement>;

  constructor(private router: Router, private route: ActivatedRoute, private imageService: ImageService, private renderer2: Renderer2) { }

  ngOnInit(): void {
    this.imageSelected = this.imageService.getImage(+this.route.snapshot.params.id);

    if (this.imageSelected) {
      this.isUpdate = true;
      this.imagePreview = this.imageSelected.src;
    }
  }

  ngAfterViewInit(): void {
    if (this.imageSelected) {
      this.renderImage();
    }
  }

  public selectFile(event): void {
    this.selectedFiles = event.target.files;
    this.currentFile = this.selectedFiles.item(0);

    if (this.currentFile.type.match(/image\/*/) == null) {
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(this.currentFile);
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.onloadend = () => {
      this.renderImage();
    };
  }

  public renderImage(): void {
    this.cropper = new Cropper(this.imagePreviewElement.nativeElement, {
      crop(): void {
        // console.log(e.detail.x);
        // console.log(e.detail.y);
        // console.log(e.detail.width);
        // console.log(e.detail.height);
        // console.log(e.detail.rotate);
        // console.log(e.detail.scaleX);
        // console.log(e.detail.scaleY);
      }
    });
  }

  public cropScaleX(): void {
    this.cropper.scaleX(this.cropper.getData().scaleX > 0 ? -1 : 1);
  }

  public cropScaleY(): void {
    this.cropper.scaleY(this.cropper.getData().scaleY > 0 ? -1 : 1);
  }

  public cropRotateLeft(): void {
    this.cropper.rotate(-45);
  }

  public cropRotateRight(): void {
    this.cropper.rotate(+45);
  }

  public cropZoomIn(): void {
    this.cropper.zoom(0.1);
  }

  public cropZoomOut(): void {
    this.cropper.zoom(-0.1);
  }

  public cropInit(): void {
    this.cropper.crop();
  }

  public cropClear(): void {
    this.cropper.clear();
  }

  public cropImageMove(): void {
    this.cropper.setDragMode('move');
  }

  public cropCropMove(): void {
    this.cropper.setDragMode('crop');
  }

  public save(): void {
    if (this.isUpdate) {
      this.imageService.updateImage(
        this.imageSelected.id,
        this.imageSelected.name,
        this.cropper.getCroppedCanvas().toDataURL('image/jpeg')
      );
    } else {
      this.imageService.addImage(this.imageName, this.cropper.getCroppedCanvas().toDataURL('image/jpeg'));
    }

    this.router.navigate(['']);
  }

}
