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
    navLinks: HTMLElement;
    public menuresponsive = false;
    public topnavopen = false;
    logueado = true;
    admin = false;
    subscript: Subscription;
    loggedSubs: Subscription;
    responsiveMedSubs: Subscription;
    subscriptAdmin: Subscription;

    constructor(
      private router: Router,
      private loginsrc: LoginService,
    ) {
      this.logueado = loginsrc.getLogueado();
      this.admin = loginsrc.admin;
      this.loggedSubs = loginsrc.logueadochange.subscribe((value) => {
          this.logueado = value;
          const aLinkCourses = document.getElementById('linkCourses') as HTMLLinkElement;
          this.putLinkFirst(aLinkCourses);
      });
      this.subscript = loginsrc.adminchange.subscribe((value) => {
          this.admin = value;
      });
    }
    public ngOnInit() {
      this.navLinks = document.getElementById('navlinks');
      this.responsiveMedSubs = responsiveMedia
      .subscribe((medStr) => {
        console.log(medStr);
        if (medStr.type === 'max' && medStr.pixels >= 768) {
          this.menuresponsive = false;
        }
        else if (medStr.type === 'min' && medStr.pixels >= 569) {
          this.menuresponsive = false;
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
        this.putLinkFirst(aLinkSelected);
      });
    }
    public putLinkFirst(elto: HTMLLinkElement) {
        this.navLinks.removeChild(elto);
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
    }
}
