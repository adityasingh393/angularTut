import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ImageUploadService } from '../../services/image-upload.service';
import { CommonModule } from '@angular/common';
import { KENDO_BUTTON } from '@progress/kendo-angular-buttons';
class ImageSnippet {
  constructor(
    public src: string,
    public file: File,
  ) {}
}

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule, KENDO_BUTTON],
  templateUrl: './file-upload.component.html',
  styleUrl: './file-upload.component.css',
})
export class FileUploadComponent implements OnInit {
  shortLink: string = '';
  loading: boolean = false;
  file: File = new File(['foo'], 'foo.txt');

  constructor(private imageUploadService: ImageUploadService) {}

  ngOnInit(): void {}

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    this.imageUploadService.upload(this.file).subscribe((event: any) => {
      if (typeof event === 'object') {
        this.shortLink = event.link;

        this.loading = false;
      }
    });
  }
}
