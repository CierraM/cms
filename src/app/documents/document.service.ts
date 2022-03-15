import { Injectable, Output } from '@angular/core';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';
import { Document } from './document.model';
import { max, Subject } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private documents: Document[];
  documentChangedEvent = new Subject<Document[]>();
  maxId: number;

  constructor(private http:HttpClient) { 
    this.documents = []
    this.maxId = this.getMaxId();
  }

  getDocuments(){
    this.http.get('http://localhost:3000/documents').subscribe((documents: Document[]) => {
      //success
      this.documents = documents;
      this.maxId = this.getMaxId();
      this.documents.sort();
      this.documentChangedEvent.next(this.documents.slice());
    }, (err) => {
      //error
      console.log(err)
    })
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

  

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    // make sure id of the new Document is empty
    document.id = '';

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // add to database
    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents',
      document,
      { headers: headers })
      .subscribe(
        (responseData) => {
          // add new document to documents
          this.documents.push(responseData.document);
          this.documentChangedEvent.next(this.documents.slice());
        }
      );
  }

  getMaxId(): number {
    let maxId = 0;
    this.documents.forEach(document => {
      let currentId = parseInt(document.id)
      if (currentId > maxId) {
        maxId = currentId;
      }
    })

    return maxId
  }


  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Document to the id of the old Document
    newDocument.id = originalDocument.id;
    newDocument['_id'] = originalDocument['_id'];

    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    // update database
    this.http.put('http://localhost:3000/documents/' + originalDocument.id,
      newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.documentChangedEvent.next(this.documents.slice());
        }
      );
  }


  deleteDocument(document: Document) {

    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.documentChangedEvent.next(this.documents.slice());
        }
      );
  }
  
  storeDocuments() {
    const payload = JSON.stringify(this.documents);
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    this.http.put('https://angular-http-57b12-default-rtdb.firebaseio.com/documents.json', payload, { headers: headers }).subscribe(() => {
      this.documentChangedEvent.next(this.documents.slice());
    })
  }
}
