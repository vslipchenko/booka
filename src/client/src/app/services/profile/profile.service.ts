import {Injectable} from '@angular/core';
import {combineLatest, Observable, of, switchMap, throwError} from 'rxjs';
import {Apollo, MutationResult} from 'apollo-angular';
import {HttpClient} from '@angular/common/http';
import {IMGBB_API, IMGBB_API_KEY} from '~app/constants/imgbb';
import {ImageBBResponse} from '~app/typings/imgbb.interfaces';
import {EDIT_PROFILE, UPDATE_PROFILE_THUMBNAIL} from '~app/graphql/profile/profile.mutations';
import {UpdateProfileThumbnailMutationResult} from '~app/typings/profile.interfaces';
import {ParticularAccountData} from '~app/typings/account.types';
import {SuccessResponse} from '~app/typings/response.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public constructor(private readonly apollo: Apollo, private readonly http: HttpClient) {
  }

  public editProfile(input: ParticularAccountData): Observable<MutationResult<SuccessResponse>> {
    return this.apollo.mutate<SuccessResponse>({
      mutation: EDIT_PROFILE,
      variables: {input},
    });
  }

  public updateImage(link?: string): Observable<MutationResult<UpdateProfileThumbnailMutationResult>> {
    return this.apollo.mutate<UpdateProfileThumbnailMutationResult>({
      mutation: UPDATE_PROFILE_THUMBNAIL,
      variables: {link},
    });
  }

  public uploadImage(file: File): Observable<[ImageBBResponse, MutationResult<UpdateProfileThumbnailMutationResult>]> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    // https://api.imgbb.com/
    return this.http
      .post<ImageBBResponse>(IMGBB_API, formData, {
        params: {key: IMGBB_API_KEY},
      })
      .pipe(
        switchMap((result) => {
          // Service originated error
          if (!result.success) return throwError('');

          return combineLatest(of(result), this.updateImage(result.data.thumb.url));
        }),
        switchMap((result) => {
          // Server originated error
          if (!result[1].data?.updateProfileThumbnail) return throwError('');

          return of(result);
        }),
      );
  }
}
