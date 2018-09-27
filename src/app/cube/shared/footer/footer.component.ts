import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { COPY } from './footer.copy';

@Component({
  selector: 'cube-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  copy = COPY;
  hideFooter = false;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.router.events.filter(event => event instanceof NavigationEnd).subscribe(event => {
      const root: ActivatedRoute = this.route.root;
      this.hideFooter = root.children[0].snapshot.data.hideNavbar;
    });

    //For the error 404 page, we want the footer to be hidden, so we set it to true
    if (this.router.url === '/error404') {
      this.hideFooter = true;
    }
  }

}
