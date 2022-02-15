import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FaqComponent {
  public readonly panels = [
    {
      title: 'Можно ли также оплачивать услуги ?',
      body: 'К сожалению, в данный момент доступен только букинг / резервирование услуг. Однако, мы планируем добавить данную возможность в будущем.',
    },
    {
      title: 'Можно ли также оплачивать услуги ?',
      body: 'К сожалению, в данный момент доступен только букинг / резервирование услуг. Однако, мы планируем добавить данную возможность в будущем.',
    },
  ];
}
