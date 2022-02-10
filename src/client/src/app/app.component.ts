import {ChangeDetectionStrategy, Component} from '@angular/core';
// import {TranslocoService} from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  // constructor(private readonly translocoService: TranslocoService) {}
  //
  // setRu(): void {
  //   this.translocoService.setActiveLang('ru');
  // }
  //
  // setUa(): void {
  //   this.translocoService.setActiveLang('uk');
  // }
}
