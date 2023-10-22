import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/modules/auth/service/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],

})
export class NavbarComponent implements OnInit {
  currentLanguage: string;

  userData: any = null
  constructor(public translate: TranslateService, private authService: AuthService, private router: Router,) {
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'en';
    this.translate.use(this.currentLanguage);
  }
  ngOnInit(): void {
    this.authService.user.subscribe(user => {
      if (user.role) {
        this.userData = user
      }

    });
  }

  logout() {
    this.authService.login({}).subscribe(user => {
      this.userData = null

      this.authService.user.next(user);
      this.router.navigate(['/login']);

    });
  }

  changeCurrentLanguage() {
    if (this.currentLanguage == 'en') {
      this._setLanguage('ar')
    }
    else {
      this._setLanguage('en')
    }
  }

  private _setLanguage(lang: string) {
    this.currentLanguage = lang;
    this.translate.use(lang);
    localStorage.setItem('currentLanguage', lang)
  }

}
