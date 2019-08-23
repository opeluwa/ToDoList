import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit, OnDestroy {
  message;
  Timer: any;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.message = this.route.snapshot.data['message'];
    this.Timer = setTimeout(() => {
      this.router.navigate(['/DashBoard']);
    }, 5000);
  }

  ngOnDestroy() {
    clearTimeout(this.Timer);
  }
}
