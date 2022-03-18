import {Injectable} from '@angular/core';
import {Observable, switchMap} from 'rxjs';
import {Apollo} from 'apollo-angular';
import {HttpClient} from '@angular/common/http';
import {IMGBB_API, IMGBB_API_KEY} from '~app/constants/imgbb';
import {ImageBBResponse} from '~app/typings/imgbb.interfaces';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  public constructor(private readonly apollo: Apollo, private readonly http: HttpClient) {}

  public saveProfileImage(file: File): Observable<unknown> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    // https://api.imgbb.com/
    return this.http.post<ImageBBResponse>(IMGBB_API, formData, {
      params: {key: IMGBB_API_KEY},
    });
    // .pipe(switchMap((result) => {}));
  }
}
