import {Injectable} from '@angular/core';
import {Apollo} from 'apollo-angular';
import {BOOKED_SERVICES_BY_USER_ID} from '~app/graphql/booking/booking.queries';
import {Observable} from 'rxjs';
import {ApolloQueryResult} from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  public constructor(private readonly apollo: Apollo) {}

  public bookedServicesByUserId(): Observable<ApolloQueryResult<unknown>> {
    return this.apollo.query<unknown>({
      query: BOOKED_SERVICES_BY_USER_ID,
    });
  }
}
