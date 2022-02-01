import { EventEmitter, Injectable } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[];
  documentSelectedEvent = new EventEmitter<Document>();

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
}
