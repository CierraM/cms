import { Pipe, PipeTransform } from '@angular/core';
import Contact from './contacts/contact.model';

@Pipe({
  name: 'contactsFilter'
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: Contact[], term) {
    let filteredContacts: Contact[] = [];

    contacts.forEach(contact => {
      if (contact.name.toLowerCase().includes(term)) {
        filteredContacts.push(contact);
      }
    })
    if (filteredContacts.length === 0) {
      return contacts;
    } 
    return filteredContacts;
    
  }

}
