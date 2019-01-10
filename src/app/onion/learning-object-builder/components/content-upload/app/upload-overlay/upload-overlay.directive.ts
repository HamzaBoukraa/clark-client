import { Directive, ViewContainerRef } from '@angular/core';
import { UploadOverlayService } from '../services/upload-overlay.service';

@Directive({ selector: 'upload-overlay' })
export class UploadOverlayDirective {
  constructor(
    viewContainer: ViewContainerRef,
    overlayService: UploadOverlayService
  ) {
    overlayService.registerContainer(viewContainer);
  }
}
