import {Directive, ElementRef, HostBinding, HostListener, Renderer2} from '@angular/core';

@Directive({
  selector: '[appDropDown]'
})
export class DropDownDirective {
  constructor() { }
  @HostBinding('class.show') showDropdown = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    const el = ((<Element> event.target).className);

    el === 'dropdown-toggle' ? (this.showDropdown ? this.showDropdown = false : this.showDropdown = true) :
      this.showDropdown = false;
  }


}
