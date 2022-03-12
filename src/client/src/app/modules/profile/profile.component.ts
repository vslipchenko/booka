import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BookingService} from '~app/services/booking/booking.service';
import {MenuItem} from '~app/typings/menu.interfaces';
import {tap} from 'rxjs';
import {AccountService} from '~app/services/account/account.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  public readonly menuItems: Array<MenuItem> = [{title: 'Главная', routerLink: '/', icon: 'web'}];

  public constructor(private readonly bookingService: BookingService, private readonly accountService: AccountService) {
    this.accountService.getAccountVitals().pipe(
      tap(({data}) => {
        console.log(data);
      }),
    ).subscribe();
  }

  public ngOnInit(): void {
    // this.bookingService.bookedServicesByUserId().subscribe();
  }
}
