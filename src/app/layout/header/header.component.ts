import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import localforage from 'localforage';
import { MatIconModule } from '@angular/material/icon';
import { authGuard } from '../../guards/auth.guard';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { KENDO_DROPDOWNBUTTON } from '@progress/kendo-angular-buttons';
import { DropDownButtonListType } from '../../interfaces/common';
import { SVGIcon, userIcon, globeIcon } from '@progress/kendo-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { TranslationService } from '../../services/translation.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, KENDO_DROPDOWNBUTTON, TranslateModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {
  // userLogged: boolean = false;
  // isAdmin: boolean = false;
  // we donot need the above varibale because we sare using signals now to update the header and its content
  // based on the fact that if user is loggged in or not

  profileIcon: SVGIcon = userIcon;
  languageIcon: SVGIcon = globeIcon;
  dropDownButtonList: DropDownButtonListType[] = [
    { title: 'My Profile' }, // Use curly braces for object literals
    { title: 'Log Out' },
  ];

  languages: string[] = ['en', 'fr'];
  constructor(
    private router: Router,
    private translationService: TranslationService,
    private changeDetector: ChangeDetectorRef,
    public authService: AuthService,
  ) {}
  async ngOnInit() {
    // this.headerUpdate();
    // try {
    //   const cookie = await localforage.getItem('cookie');
    //   const role = await localforage.getItem('role');
    //   this.isAdmin = role === 'Admin';
    //   this.userLogged = !!cookie;

    //   this.changeDetector.detectChanges();
    //   this.changeDetector.markForCheck();
    // } catch (error) {
    //   console.error('Error retrieving cookie:', error);
    // }
    this.authService.checkUserStatus();
  }
  // headerUpdate() {
  //   setTimeout(() => {
  //     console.log("checking for change in headeruodate")
  //   }, 10000);
  // }

  onChangeOption(option: DropDownButtonListType) {
    if (option.title === 'Log Out') {
      this.router.navigateByUrl('/login');
      this.authService.logoutUser();
      // this.changeDetector.detectChanges();
    }
    if (option.title === 'My Profile') {
      this.router.navigateByUrl('home');
    }
  }
  onChangeLanguage(option: string) {
    console.log(option);
    this.translationService.changeLang(option);
  }
}
