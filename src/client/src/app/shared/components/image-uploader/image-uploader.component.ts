import {ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {DomSanitizer} from '@angular/platform-browser';
import {Observable, startWith} from 'rxjs';

@Component({
  selector: 'app-image-uploader',
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploaderComponent implements OnInit, OnDestroy {
  @Input() public readonly alt = '';
  @Input() public readonly previewControl = new FormControl();
  @Input() public readonly fileControl = new FormControl();

  public previewChanges$?: Observable<string>;

  private readonly accept = 'image/jpeg, image/png'; // File type constraint
  private readonly fileInput = this.fileInputElement;

  public constructor(private readonly domSanitizer: DomSanitizer) {}

  public ngOnInit(): void {
    if (!this.previewControl.value) this.previewControl.setValue('./assets/images/avatar-placeholder.png');

    this.previewChanges$ = this.previewControl.valueChanges.pipe(startWith(this.previewControl.value));
  }

  public ngOnDestroy(): void {
    this.fileInput.remove();
  }

  public browse(): void {
    this.fileInput.click();
  }

  private get fileInputElement(): HTMLInputElement {
    const fileInput = document.createElement('input');

    fileInput.type = 'file';
    fileInput.accept = this.accept;
    fileInput.onchange = (): void => {
      // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL#memory_management
      URL.revokeObjectURL(this.previewControl.value);

      const file = fileInput.files?.[0];

      if (file) {
        this.previewControl.setValue(this.domSanitizer.bypassSecurityTrustUrl(URL.createObjectURL(file)));
        return this.fileControl.setValue(file);
      }

      this.previewControl.setValue('./assets/images/avatar-placeholder.png');
      this.fileControl.setValue(null);
    };

    return fileInput;
  }
}
