import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {BookingService} from '~app/services/booking/booking.service';
import {AuthenticationService} from '~app/services/authentication/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileComponent implements OnInit {
  public constructor(
    private readonly authenticationService: AuthenticationService,
    private readonly bookingService: BookingService,
  ) {}

  public ngOnInit(): void {
    this.bookingService.bookedServicesByUserId().subscribe();
  }
}
