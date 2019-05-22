import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropdownDirective {
  @HostBinding('style.font-weight') fontWeight: string;

  constructor() {}

  @HostListener('mouseenter') mouseEnter() {
    this.fontWeight = 'bold';
  }

  @HostListener('mouseleave') mouseLeave() {
    this.fontWeight = 'normal';
  }
}
