import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../shared/services/login.service';
import { fromEvent, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import responsiveMedia from '../../shared/services/responsive.service';

@Component({
    selector: 'app-nav',
    templateUrl: './app-nav.component.html',
    styleUrls: ['./app-nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy{
    public navLinks: HTMLElement;
    public menuresponsive = false;
    public topnavopen = false;
    logueado = true;
    admin = false;
    subscript: Subscription;
    loggedSubs: Subscription;
    responsiveMedSubs: Subscription;
    subscriptAdmin: Subscription;
    private coursesLink: HTMLLinkElement;
    private loginLink: HTMLLinkElement;
    private showOnlyLink() {
      const allLinks = this.navLinks.childNodes;
      allLinks.forEach((link: HTMLLinkElement) => {
        if (link.id !== 'coursesLink') {
          link.style.display = 'none';
        }
      })
    }
    constructor(
      private router: Router,
      private loginsrc: LoginService,
    ) {
      this.logueado = loginsrc.getLogueado();
      this.admin = loginsrc.admin;
      this.loggedSubs = loginsrc.logueadochange.subscribe((value) => {
          this.logueado = value;
          // this.coursesLink = document.getElementById('coursesLink') as HTMLLinkElement;
          this.putLinkFirst(this.coursesLink);
      });
      this.subscript = loginsrc.adminchange.subscribe((value) => {
          this.admin = value;
      });
    }
    public ngOnInit() {
      this.navLinks = document.getElementById('navlinks');
      this.coursesLink = document.getElementById('coursesLink') as HTMLLinkElement;
      this.loginLink = document.getElementById('loginLink') as HTMLLinkElement;
      this.responsiveMedSubs = responsiveMedia
      .subscribe((medStr) => {
        if (medStr.type === 'max' && medStr.pixels >= 768) {
          this.menuresponsive = false;
          console.log('responsive false');
        }
        else if (medStr.type === 'min' && medStr.pixels >= 569) {
          this.menuresponsive = false;
          console.log('responsive false');
        } else {
          console.log('responsive true');
          this.menuresponsive = true;
        }
      });

      const aElements = this.navLinks.childNodes;
      const onClickLinks = fromEvent(aElements, 'click');
      onClickLinks.subscribe((click) => {
        console.log('click: ', click);
        this.openCloseMenu();
        // muevo el elto al principio de la lista
        const aLinkSelected = click.srcElement as HTMLLinkElement;
        // this.putLinkFirst(aLinkSelected);
      });
    }
    public putLinkFirst(elto: HTMLLinkElement) {
      this.navLinks.insertBefore(elto, this.navLinks.firstChild);
    }
    public ngOnDestroy() {
      this.responsiveMedSubs.unsubscribe();
    }
    public openCloseMenu() {
      console.log('click', this.menuresponsive);
      // if class include responsive change var
      if (this.menuresponsive === true) {
        this.topnavopen = !this.topnavopen;
      }
    }
    public logout() {
      this.loginsrc.logout();
      this.router.navigate(['/login']);
      this.putLinkFirst(this.loginLink);
    }
}
