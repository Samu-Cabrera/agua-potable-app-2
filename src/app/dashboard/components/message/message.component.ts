import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

interface Message {
  id: string;
  user: User;
  message: string;
  date: Date
}

interface User {
  id: string;
  name: string;
  lastname: string;
  address: string;
  imagen: string;
}

@Component({
  selector: 'message',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './message.component.html',
  styleUrl: './message.component.scss'
})
export class MessageComponent {

  public messages = input.required<Message[]>();
  public user = input.required<User>();

}
