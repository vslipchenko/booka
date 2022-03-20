import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject, finalize, Subject, takeUntil} from 'rxjs';
import {DEFAULT_PROFILE_IMAGE} from '~app/constants/images';
import {Destroyable} from '~app/typings/component.interfaces';
import {ProfileService} from '~app/services/profile/profile.service';
import {SnackbarService} from '~app/shared/services/snackbar/snackbar.service';
import {MatDialog} from '@angular/material/dialog';
import {ImageUploaderMenuComponent} from '~app/shared/components/image-uploader-menu/image-uploader-menu.component';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploaderComponent implements OnInit, Destroyable {
  @Input() public alt = '';
  @Input() public preview = '';

  public readonly destroy$ = new Subject<void>();
  public readonly loading$ = new BehaviorSubject(false);

  public preview$ = new BehaviorSubject<string>(DEFAULT_PROFILE_IMAGE);

  private readonly accept = ['image/jpeg', 'image/png']; // File type constraint
  private readonly fileInput = this.fileInputElement;

  public constructor(
    private readonly profileService: ProfileService,
    private readonly snackbarService: SnackbarService,
    private readonly dialog: MatDialog,
  ) {}

  public ngOnInit(): void {
    if (this.preview) this.preview$.next(this.preview);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    this.fileInput.remove();
  }

  public open(): void {
    // Show file browse window if no profile image
    if (this.preview$.getValue() === DEFAULT_PROFILE_IMAGE) return this.fileInput.click();

    const dialog = this.dialog.open(ImageUploaderMenuComponent, {autoFocus: 'dialog'});

    dialog.componentInstance.upload.pipe(takeUntil(dialog.afterClosed())).subscribe(() => this.fileInput.click());
    dialog.componentInstance.delete.pipe(takeUntil(dialog.afterClosed())).subscribe(() => this.deleteImage());
  }

  private deleteImage(): void {
    this.loading$.next(true);

    this.profileService
      .updateImage()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => this.loading$.next(false)),
      )
      .subscribe(
        () => this.preview$.next(DEFAULT_PROFILE_IMAGE),
        () => this.showSnackbar(),
      );
  }

  private showSnackbar(): void {
    this.snackbarService.open('Что-то пошло не так. Пожалуйста, повторите попытку позже.', 'OK');
  }

  private get fileInputElement(): HTMLInputElement {
    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.accept = this.accept.join(',');
    fileInput.onchange = (): void => {
      const file = fileInput.files?.[0];

      if (!(file && this.accept.includes(file.type))) return;

      this.loading$.next(true);

      this.profileService
        .uploadImage(file)
        .pipe(
          takeUntil(this.destroy$),
          finalize(() => this.loading$.next(false)),
        )
        .subscribe(
          (result) => this.preview$.next(result[0].data.thumb.url),
          () => this.showSnackbar(),
        );
    };

    return fileInput;
  }
}
