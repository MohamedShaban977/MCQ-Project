import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/service/auth.service';
import { CrudService } from 'src/app/modules/shared/service/crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private crudService: CrudService, private router: Router,
  ) {
    this.crudService.get<any>(this.crudService.BaseUrl, 'login/1').subscribe(data => {
      this.currentUser = data
    });
  }
  currentUser: any = null
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.currentUser?.userName) {
      console.log('Auth Guard', this.currentUser);
      return true
    }
    this.router.navigate(['/auth/login']);
    return false




  }

}
