import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';


@Component({
  selector: 'cms-message-edit',
  templateUrl: './message-edit.component.html',
  styleUrls: ['./message-edit.component.css']
})
export class MessageEditComponent implements OnInit {
  sender: string = '1';
  @ViewChild('msgText') msgTextInputRef: ElementRef;
  @ViewChild('subject') subjectInputRef: ElementRef;

  @Output() addMessageEvent = new EventEmitter<Message>();

  constructor(public messageService: MessageService) { }

  ngOnInit(): void {
  }

  onSendMessage() {
    const subject = this.subjectInputRef.nativeElement.value;
    const msgText = this.msgTextInputRef.nativeElement.value;
    
    const message = new Message('1', subject, msgText, this.sender)
    this.messageService.addMessage(message)

    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }

}
