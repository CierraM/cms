import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Contact from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[] = []
  maxId: number;

  // contactSelectedEvent = new EventEmitter<Contact>();
  contactChangedEvent = new Subject<Contact[]>();

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
    this.contactChangedEvent.next(this.contacts.slice());
  }

  addcontact(newContact: Contact) {
    if (!newContact) {
      return;
    }
    
    this.maxId++;
    newContact.id = this.maxId.toString();
    this.contacts.push(newContact);
    this.contactChangedEvent.next(this.contacts.slice());
    
  }
  getMaxId(): number {
    let maxId = 0;
    this.contacts.forEach(contact => {
      let currentId = parseInt(contact.id)
      if (currentId > maxId) {
        maxId = currentId;
      }
    })

    return maxId
  }

  updatecontact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact)

    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id.toString();

    this.contacts[pos] = newContact
    this.contactChangedEvent.next(this.contacts.slice())
  }

  deletecontact(contact: Contact) {
    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.next(this.contacts.slice());
 }
}

