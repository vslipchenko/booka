import {ChangeDetectionStrategy, Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-image-upload-menu',
  templateUrl: './image-uploader-menu.component.html',
  styleUrls: ['./image-uploader-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageUploaderMenuComponent {
  @Output() public readonly upload = new EventEmitter<void>();
  @Output() public readonly delete = new EventEmitter<void>();
}
