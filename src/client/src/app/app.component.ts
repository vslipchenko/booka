import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ICONS, ICONS_PATH} from '~app/constants/icons';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
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
  ) {
    this.registerIcons();
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
        icon.name,
        this.domSanitizer.bypassSecurityTrustResourceUrl(`${ICONS_PATH}${icon.fileName}.svg`),
      );
    });
  }
}
