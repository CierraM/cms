import { Component, OnInit, Input } from '@angular/core';
import Contact from './contact.model';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  @Input() selectedContact: Contact;

  constructor() { }

  ngOnInit(): void {
  }

}
