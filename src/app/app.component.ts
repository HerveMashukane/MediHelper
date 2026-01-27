import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConfirmDialogService, ConfirmOptions } from './confirm-dialog.service';
import { ConfirmDialogComponent } from './reusableComponent/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ConfirmDialogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MediHelpApp';
  options: ConfirmOptions | null = null;

  constructor(private confirmDialogService: ConfirmDialogService) {
    this.confirmDialogService.confirm$.subscribe(opts => {
      this.options = opts;
    });
  }

  onResponse(result: boolean) {
    this.confirmDialogService.respond(result);
  }
}
