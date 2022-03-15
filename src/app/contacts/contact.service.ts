import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import Contact from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private contacts: Contact[];
  maxId: number;
  contactChangedEvent = new Subject<Contact[]>();

  // contactSelectedEvent = new EventEmitter<Contact>();
  
  constructor(private http:HttpClient) {
    this.contacts = []
    this.maxId = this.getMaxId();
    this.getContacts();

  }

  getContacts() {
    this.http.get('http://localhost:3000/contacts').subscribe((contacts: Contact[]) => {
      //success
      this.contacts = contacts;
      this.maxId = this.getMaxId();
      this.contacts.sort();
      this.contactChangedEvent.next(this.contacts.slice());
    }, (err) => {
      //error
      console.log(err)
    })
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


  addcontact(newContact: Contact) {
    if (!newContact) {
      return;
    }

    newContact.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    this.http.post<{ message: string, contact: Contact }>('http://localhost:3000/contacts',
    newContact,
    { headers: headers })
    .subscribe(
      (responseData) => {
        // add new contact to contacts
        this.contacts.push(responseData.contact);
        this.contactChangedEvent.next(this.contacts.slice())
      }
    );
    
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

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) {
      return;
    }

    let pos = this.contacts.indexOf(originalContact)

    if (pos < 0) {
      return;
    }

    newContact.id = originalContact.id.toString();
    newContact['_id'] = originalContact['_id'];

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/contacts/' + originalContact.id,
      newContact, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.contacts[pos] = newContact;
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );

  }

  deleteContact(contact: Contact) {

    if (!contact) {
       return;
    }
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) {
       return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/contacts/' + contact.id)
      .subscribe(
        (response: Response) => {
          this.contacts.splice(pos, 1);
          this.contactChangedEvent.next(this.contacts.slice());
        }
      );
  }
  
  storeContacts() {
    const payload = JSON.stringify(this.contacts);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.put('https://angular-http-57b12-default-rtdb.firebaseio.com/contacts.json', payload, { headers: headers }).subscribe(() => {
      this.contactChangedEvent.next(this.contacts.slice());
    }, (err) => {
      console.log(err)
    })
  }
  
}

