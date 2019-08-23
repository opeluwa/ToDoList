import {AfterViewInit, Component, ComponentFactoryResolver, DoCheck, OnChanges, OnInit, ViewChild} from '@angular/core';
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
    @ViewChild(PlaceholderDirective, {static: false}) listPopUp: PlaceholderDirective; // place where directive should appear
    constructor(private listServ: ListService, private ComponentFactory: ComponentFactoryResolver, private router: Router, private route: ActivatedRoute
              ) { }

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

    showListChecker(index: number) { // contruct dynamic component for checking of a list
      const compFactory = this.ComponentFactory.resolveComponentFactory(ListCheckerComponent);  // dynamic component creation
      const hostviwecontainerRef = this.listPopUp.viewContainerRef;
      hostviwecontainerRef.clear();  // clear anything that might have be there
      const compRef = hostviwecontainerRef.createComponent(compFactory);
      this.router.navigate(['edit'], {relativeTo: this.route});
      compRef.instance.list = this.list[index];
      compRef.instance.priority = this.list[index].priority;
      compRef.instance.listIndex = index;
      compRef.instance.close.pipe(take(1)).subscribe(() => {  // close if event emits
        compRef.destroy();
        this.router.navigate(['/DashBoard']);
      });

    }

}
