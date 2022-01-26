import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  documents = [
    new Document('1', 'Art337 paper', 'a paper about feedback in ux design', 'https://docs.google.com/document/d/1Bixslj7wH9SWjyPLXCLTAAWryLv-Ly5N9JVB0rN2tdk/edit', []),
    new Document('2', 'CIT225 paper', 'a paper about MySQL JOINs', 'https://docs.google.com/document/d/1f4BOxtU8v2RkoH-jZd1AzpeK4Cj_TNZfp2WYbp9tnMI/edit#heading=h.uri4g8wk9cqr', []),
    new Document('3', 'Manicotti', 'a recipe for manicotti', 'https://docs.google.com/document/d/1lH7tm-BTn0A_ZK3VjUdO9jZSjS8OgOqsW_DKTcL98Cc/edit', []),

  ]
  constructor() { }

  ngOnInit(): void {
  }

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
