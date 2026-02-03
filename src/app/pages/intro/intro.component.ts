import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-intro',
  imports: [],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss'
})
export class IntroComponent {
  menuOpen: boolean = false;
  isScrolled = false;

  isHero = true;
  isFooter = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
     this.isScrolled = window.scrollY > window.innerHeight * 0.85;
    const scrollY = window.scrollY;
    const vh = window.innerHeight;

    const footer = document.querySelector('footer') as HTMLElement;
    const footerTop = footer
      ? footer.offsetTop - vh * 0.4
      : Infinity;

    this.isHero = scrollY < vh * 0.85;

    this.isFooter = scrollY >= footerTop;
  }

  navigateTo(sectionId: string) {
  this.menuOpen = false; 

  setTimeout(() => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }, 450); 
}
}
