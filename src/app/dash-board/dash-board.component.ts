import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  Renderer2,
  ViewChild
} from '@angular/core';
import {ListService} from '../shared/list.service';
import {ListModel} from '../shared/list.model';
import {PlaceholderDirective} from './placeholder.directive';
import {NewListComponent} from './new-list/new-list.component';
import {take} from 'rxjs/operators';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import {ListCheckerComponent} from './list-checker/list-checker.component';
import {relativeFrom} from '@angular/compiler-cli/src/ngtsc/file_system';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css']
})
export class DashBoardComponent implements OnInit {
    list: ListModel[] = []; // hold all the lists
    selected = 1;
    @ViewChild(PlaceholderDirective, {static: false}) listPopUp: PlaceholderDirective; // place where directive should appear
    @ViewChild('dropdown', {static: false}) dropDown: ElementRef;
    constructor(private listServ: ListService, private ComponentFactory: ComponentFactoryResolver,
                private router: Router, private route: ActivatedRoute, private renderer: Renderer2) { }

    ngOnInit() {
      this.listServ.listSubject.subscribe(data => {
        this.list = this.listServ.getList(); // listen to bills and update page changed
      });
      if (this.route.firstChild) {
        this.router.navigate(['/DashBoard']);
      }
    }


    showCreateList() {  // contruct dynamic component for new lists
      const compFactory = this.ComponentFactory.resolveComponentFactory(NewListComponent);
      const hostviwecontainerRef = this.listPopUp.viewContainerRef;
      this.router.navigate(['new'], {relativeTo: this.route});
      hostviwecontainerRef.clear();  // clear anything that might have be there
      const compRef = hostviwecontainerRef.createComponent(compFactory);
      compRef.instance.close.pipe(take(1)).subscribe(() => {  // close if event emits
        compRef.destroy();
        this.router.navigate(['/DashBoard']);
      });
    }

    showListChecker(item: ListModel) { // contruct dynamic component for checking of a list
      const index = (this.listServ.getList()).indexOf(item);
      const compFactory = this.ComponentFactory.resolveComponentFactory(ListCheckerComponent);  // dynamic component creation
      const hostviwecontainerRef = this.listPopUp.viewContainerRef;
      hostviwecontainerRef.clear();  // clear anything that might have be there
      const compRef = hostviwecontainerRef.createComponent(compFactory);
      this.router.navigate(['edit'], {relativeTo: this.route});
      compRef.instance.list = item;
      compRef.instance.priority = item.priority;
      compRef.instance.listIndex = index;
      compRef.instance.close.pipe(take(1)).subscribe(() => {  // close if event emits
        compRef.destroy();
        this.router.navigate(['/DashBoard']);
      });

    }

  onDropdown() {
    const el = this.dropDown.nativeElement.classList.contains('show');
    el ? this.renderer.removeClass(this.dropDown.nativeElement, 'show') :
      this.renderer.addClass(this.dropDown.nativeElement, 'show');
  }

}
