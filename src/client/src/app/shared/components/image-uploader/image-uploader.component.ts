import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';
import {DEFAULT_PROFILE_IMAGE} from '~app/constants/images';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploaderComponent implements OnInit, OnDestroy {
  @Input() public alt = '';
  @Input() public preview = '';
  @Input() public control = new FormControl();

  public preview$ = new BehaviorSubject<string>(DEFAULT_PROFILE_IMAGE);

  private readonly accept = ['image/jpeg', 'image/png']; // File type constraint
  private readonly fileInput = this.fileInputElement;

  public ngOnInit(): void {
    if (this.preview) this.preview$.next(this.preview);
  }

  public ngOnDestroy(): void {
    URL.revokeObjectURL(this.preview$.getValue());
    this.fileInput.remove();
  }

  public browse(): void {
    this.fileInput.click();
  }

  private get fileInputElement(): HTMLInputElement {
    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.accept = this.accept.join(',');
    fileInput.onchange = (): void => {
      // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL#memory_management
      URL.revokeObjectURL(this.preview$.getValue());

      const file = fileInput.files?.[0];

      if (file && this.accept.includes(file.type)) {
        this.preview$.next(URL.createObjectURL(file));

        return this.control.setValue(file);
      }

      this.preview$.next(DEFAULT_PROFILE_IMAGE);

      this.control.setValue(null);
    };

    return fileInput;
  }
}
