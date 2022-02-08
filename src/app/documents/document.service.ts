import { EventEmitter, Injectable, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();
  documentChangedEvent = new EventEmitter<Document[]>();

  constructor() { 
    this.documents = MOCKDOCUMENTS
  }

  getDocuments(): Document[]{
    return this.documents.slice();
  }

  getDocument(id: string): Document {
    let selected = null;
    this.documents.forEach(document => {
      if (document.id === id) {
        selected = document
      }
    })
    return selected;
  }

  deleteDocument(document: Document) {
    if (!document) {
       return;
    }
    const pos = this.documents.indexOf(document);
    if (pos < 0) {
       return;
    }
    this.documents.splice(pos, 1);
    this.documentChangedEvent.emit(this.documents.slice());
 }
}
