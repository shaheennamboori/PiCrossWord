import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WordGridComponent } from './components/word-grid/word-grid.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, WordGridComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'PiCrossWord';
}
