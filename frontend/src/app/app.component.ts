import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { AlienService } from './services/alien.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  nickname: string;
  // text = 'hello world';
  message: string;

  // @Input() name: String = 'abc';
  data$: any[];

  constructor(private _alienService: AlienService) {
    this.nickname = environment.nickname;
    this.message = '';
    this.data$ = [];
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this._alienService.getData().subscribe((data) => {
      console.log(data);
      this.data$ = data;
    });
  }
  onInput(val: string) {
    this.message = val;
  }

  handleKeyUp() {
    this._alienService
      .sendData({
        nickname: this.nickname,
        message: this.message,
      })
      .subscribe((data) => {
        this.data$.push(data);
      });
  }
}
