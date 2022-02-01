import { EventEmitter, Injectable } from '@angular/core';
import Contact from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = []

  contactSelectedEvent = new EventEmitter<Contact>();

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }

  getContacts(): Contact[] {
    return this.contacts.slice();
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
}
