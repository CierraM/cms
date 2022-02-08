import { EventEmitter, Injectable } from '@angular/core';
import Contact from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = []

  contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new EventEmitter<Contact[]>();

  constructor() {
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts
      .sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0) //put them in alphabetical order
      .slice();
  }

  getContact(id: string): Contact {
    let selected = null
    this.contacts.forEach(contact => {
      if (contact.id === id) {
        selected = contact
      }
    })
    return selected;
  }

  deleteContact(contact: Contact) {
    if (!contact) {
      return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
      return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}

