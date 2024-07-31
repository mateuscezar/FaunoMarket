import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-layout-login',
  standalone: true,
  imports: [],
  templateUrl: './layout-login.component.html',
  styleUrl: './layout-login.component.scss'
})
export class LayoutLoginComponent {
  
  @Input() titleLayout: string = "";
  @Input() primaryBtnText: string = "";
  @Input() secondaryBtnText: string = "";
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  submit(){
    console.log('Submit');
    this.onSubmit.emit();
  }

  navigate(){
    console.log('Navigate');
    this.onNavigate.emit();
  }
}
