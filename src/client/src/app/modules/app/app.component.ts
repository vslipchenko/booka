import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ICONS, ICONS_PATH} from '~app/constants/icons';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {Store} from '@ngxs/store';
import {AppState} from '~app/app/store/app.state';
// import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  public constructor(
    // private readonly translocoService: TranslocoService
    private readonly matIconRegistry: MatIconRegistry,
    private readonly domSanitizer: DomSanitizer,
    private readonly store: Store,
  ) {
    this.registerIcons();
  }

  public ngOnInit(): void {
    this.store.selectOnce(AppState.authenticated()).subscribe(console.log);
  }
  //
  // setRu(): void {
  //   this.translocoService.setActiveLang('ru');
  // }
  //
  // setUa(): void {
  //   this.translocoService.setActiveLang('uk');
  // }
  private registerIcons(): void {
    ICONS.forEach((icon) => {
      this.matIconRegistry.addSvgIcon(
        icon,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`${ICONS_PATH}/${icon}.svg`),
      );
    });
  }
}
