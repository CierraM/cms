import { Component, OnDestroy, OnInit,  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Contact from '../contact.model';
import { ContactService } from '../contact.service';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  contacts: Contact[]
  term: string;
  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) {

   }

  ngOnInit(): void {
    this.contacts = this.contactService.getContacts();
    this.subscription = this.contactService.contactChangedEvent.subscribe((contacts) => {
      this.contacts = contacts
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  search(value: string) {
    this.term = value
  }

}
