import { Component, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Contact from '../contact.model';
import { ContactService } from '../contact.service';
import { Params } from '@angular/router';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contacts: Contact[]
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {

   }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.contactService.contactChangedEvent.subscribe((contacts) => {
      this.contacts = contacts
    })
  }



}
