import { Component } from '@angular/core';
import { IntroComponent } from '../intro/intro.component';
import { AboutComponent } from "../about/about.component";
import { GalleryComponent } from "../gallery/gallery.component";
import { ContactsComponent } from "../contacts/contacts.component";
import { FooterComponent } from "../footer/footer.component"; 

@Component({
  selector: 'app-home',
  imports: [IntroComponent, AboutComponent, GalleryComponent,
     ContactsComponent,FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
