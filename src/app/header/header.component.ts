import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Output() pathEmitter: EventEmitter<string> = new EventEmitter();

  onNavigate(path: string) {
    this.pathEmitter.emit(path);
  }
}
