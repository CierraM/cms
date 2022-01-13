import { Component, OnInit } from '@angular/core';
import Contact from '../contact.model';

@Component({
  selector: 'cms-contact-detail',
  templateUrl: './contact-detail.component.html',
  styleUrls: ['./contact-detail.component.css']
})
export class ContactDetailComponent implements OnInit {
  contact: Contact = new Contact(2, "Rex Barzee", "barzeer@byui.edu", "208-496-3678", "../../assets/images/barzeer.jpg", null);
  constructor() { }

  ngOnInit(): void {
  }

}
