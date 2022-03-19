import {Injectable} from '@angular/core';
import {Observable, switchMap, throwError} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {HttpClient} from '@angular/common/http';
import {IMGBB_API, IMGBB_API_KEY} from '~app/constants/imgbb';
import {ImageBBResponse} from '~app/typings/imgbb.interfaces';
import {UPDATE_PROFILE_IMAGE} from '~app/graphql/profile/profile.mutations';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public constructor(private readonly apollo: Apollo, private readonly http: HttpClient) {}

  public updateImage(link: string): Observable<unknown> {
    return this.apollo.mutate<unknown>({
      mutation: UPDATE_PROFILE_IMAGE,
      variables: {link},
    });
  }

  public uploadImage(file: File): Observable<unknown> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    // https://api.imgbb.com/
    return this.http
      .post<ImageBBResponse>(IMGBB_API, formData, {
        params: {key: IMGBB_API_KEY},
      })
      .pipe(
        switchMap((result) => {
          if (!result.success) return throwError('');

          return this.updateImage(result.data.thumb.url);
        }),
      );
  }
}
