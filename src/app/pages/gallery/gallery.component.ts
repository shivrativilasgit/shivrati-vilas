import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { GALLERY_IMAGES, GalleryImage } from '../../shared/gallery-images';

@Component({
  selector: 'app-gallery',
  imports: [CommonModule],
  templateUrl: './gallery.component.html',
  styleUrl: './gallery.component.scss',
})
export class GalleryComponent {
  constructor(private router: Router) {}

  images: GalleryImage[] = GALLERY_IMAGES;
  infiniteImages: GalleryImage[] = [];

  ngOnInit() {
    this.infiniteImages = [...this.images, ...this.images];
  }

  selectedImage: any = null;
  readonly visibleCount = 7;
  currentIndex = 0;

  openLightbox(img: any) {
    this.selectedImage = img;
    document.body.style.overflow = 'hidden';
    this.showTapHint = false;
  }

  get remainingCount(): number {
    return Math.max(this.images.length - this.visibleCount, 0);
  }

  closeLightbox(event?: Event) {
    if (event) event.stopPropagation();
    this.selectedImage = null;
    document.body.style.overflow = '';
  }

  goToGalleryPage() {
    console.log('Navigating to gallery page');
    this.router.navigate(['/gallery']);
  }

  nextImage(event: Event) {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.selectedImage = this.images[this.currentIndex];
  }

  prevImage(event: Event) {
    event.stopPropagation();
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.selectedImage = this.images[this.currentIndex];
  }

  onCarouselScroll(container: HTMLElement) {
    const scrollLeft = container.scrollLeft;
    const maxScroll = container.scrollWidth / 2;

    if (scrollLeft >= maxScroll) {
      container.scrollLeft = scrollLeft - maxScroll;
    }

    if (scrollLeft <= 0) {
      container.scrollLeft = maxScroll + scrollLeft;
    }
  }

  showTapHint = true;

  touchStartX = 0;
  touchStartY = 0;
  touchEndX = 0;
  touchEndY = 0;

  onTouchStart(event: TouchEvent) {
    const touch = event.changedTouches[0];
    this.touchStartX = touch.screenX;
    this.touchStartY = touch.screenY;
  }

  onTouchMove(event: TouchEvent) {
    const touch = event.changedTouches[0];
    this.touchEndX = touch.screenX;
    this.touchEndY = touch.screenY;
  }

  onTouchEnd() {
    const deltaX = this.touchStartX - this.touchEndX;
    const deltaY = this.touchStartY - this.touchEndY;

    const absX = Math.abs(deltaX);
    const absY = Math.abs(deltaY);

    // 👉 Horizontal swipe (navigate)
    if (absX > 50 && absX > absY) {
      if (deltaX > 0) {
        this.nextImage(new Event('swipe'));
      } else {
        this.prevImage(new Event('swipe'));
      }
    }

    // 👇 Vertical swipe down (close)
    if (absY > 80 && deltaY < 0) {
      this.closeLightbox();
    }

    this.resetTouch();
  }

  resetTouch() {
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.touchStartY = 0;
    this.touchEndY = 0;
  }
}
