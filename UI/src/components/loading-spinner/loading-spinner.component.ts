import { Component, inject } from '@angular/core';
import { LoadingStateService } from '../../store/loading-state-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.scss'
})
export class LoadingSpinnerComponent {
  private loadingStateService = inject(LoadingStateService);
  protected loading$ = this.loadingStateService.get();
}
