import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contacts',
  imports: [CommonModule, FormsModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
})
export class ContactsComponent {
  contact = {
    name: '',
    email: '',
    phone: '',
    message: '',
    rooms: 1,
    persons: 1,
  };

  maxRooms = 6;
  maxPersonsPerRoom = 3;
  whatsAppLink = 'https://wa.me/919660401592';

  get minPersons(): number {
    return this.contact.rooms;
  }

  get maxPersons(): number {
    return this.contact.rooms * this.maxPersonsPerRoom;
  }

  onRoomChange() {
    if (this.contact.persons < this.minPersons) {
      this.contact.persons = this.minPersons;
    }

    if (this.contact.persons > this.maxPersons) {
      this.contact.persons = this.maxPersons;
    }
  }

  onPersonsChange() {
    if (this.contact.persons < this.minPersons) {
      this.contact.persons = this.minPersons;
    }

    if (this.contact.persons > this.maxPersons) {
      this.contact.persons = this.maxPersons;
    }
  }

  generateWhatsAppLink() {
    const text = `
Name: ${this.contact.name}
Email: ${this.contact.email}
Phone: ${this.contact.phone}

Rooms: ${this.contact.rooms}
Persons: ${this.contact.persons}

Message:
${this.contact.message}
    `.trim();

    const url = 'https://wa.me/919660401592?text=' + encodeURIComponent(text);

    window.open(url, '_blank');
  }
}
