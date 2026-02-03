import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GALLERY_IMAGES, GalleryImage } from '../../shared/gallery-images';

@Component({
  selector: 'app-gallery-page',
  imports: [CommonModule],
  templateUrl: './gallery-page.component.html',
  styleUrl: './gallery-page.component.scss'
})
export class GalleryPageComponent {

  images: GalleryImage[] = GALLERY_IMAGES;

  lightboxOpen = false;
  currentIndex = 0;

  openLightbox(index: number) {
    this.currentIndex = index;
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxOpen = false;
    document.body.style.overflow = 'auto';
  }

  next() {
    this.currentIndex =
      (this.currentIndex + 1) % this.images.length;
  }

  prev() {
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) %
      this.images.length;
  }

  goBack() {
  window.history.back();
}

  @HostListener('window:keydown', ['$event'])
  handleKeyboard(event: KeyboardEvent) {
    if (!this.lightboxOpen) return;

    if (event.key === 'ArrowRight') {
      this.next();
    } else if (event.key === 'ArrowLeft') {
      this.prev();
    }else if (event.key === 'ArrowUp') {
      this.prev();
    }else if (event.key === 'ArrowDown') {
      this.next();
    } else if (event.key === 'Escape') {
      this.closeLightbox();
    }
  }
}
