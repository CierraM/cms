import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import Contact from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  groupContacts: Contact[] = [];
  originalContact: Contact;
  contact: Contact;
  editMode: boolean = false;
  id: string;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      if (!params['id']) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(params['id']);
      if (!this.originalContact) {
        return
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if (this.contact.group) {
        this.groupContacts = this.contact.group.slice();
      }

    })
  }

  onCancel() {
    this.router.navigate(['/contacts'])
  }

  onSubmit(form: NgForm) {
    let newContact = new Contact(null, form.value.name, form.value.email, form.value.phone, form.value.imageUrl, this.groupContacts);
    if (this.editMode) {
      this.contactService.updatecontact(this.originalContact, newContact)
    } else {
      this.contactService.addcontact(newContact);

    }
    this.router.navigate(['/contacts'])
  }

  addToGroup($event: any) {
    console.log($event)
    const selectedContact: Contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);
    if (invalidGroupContact) {
      return;
    }
    this.groupContacts.push(selectedContact)
  }

  isInvalidContact(newContact: Contact) {
    if (!newContact) {// newContact has no value
      return true;
    }
    if (this.contact && newContact.id === this.contact.id) {
       return true;
    }
    for (let i = 0; i < this.groupContacts.length; i++){
       if (newContact.id === this.groupContacts[i].id) {
         return true;
      }
    }
    return false;
  }

  onRemoveItem(index: number) {
    if (index < 0 || index >= this.groupContacts.length) {
      return;
    }
    this.groupContacts.splice(index, 1);
  }

}
