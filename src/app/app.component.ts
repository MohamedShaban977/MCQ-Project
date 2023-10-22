import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/service/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'mcq_project';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserData();
  }


  getUserData() {
    this.authService.getRoleUser();
  }
}
