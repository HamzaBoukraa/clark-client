import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable()
export class UploadOverlayService {
  private container: ViewContainerRef;
  private onCreateListeners: Function[] = [];
  private onDestroyListeners: Function[] = [];
  constructor() {}

  /**
   * Adds listeners for container creation
   *
   * @param {Function} fn
   * @memberof UploadOverlayService
   */
  onContainerCreated(fn: Function) {
    this.onCreateListeners.push(fn);
  }

  /**
   * Adds listeners for container deletion
   *
   * @param {Function} fn
   * @memberof UploadOverlayService
   */
  onContainerDestroyed(fn: Function) {
    this.onDestroyListeners.push(fn);
  }

  /**
   * Sets container instance and applies create listeners to container
   *
   * @param {*} container
   * @memberof UploadOverlayService
   */
  registerContainer(container) {
    if (!container) {
      this.container = container;
      this.onCreateListeners.forEach(fn => {
        fn(this.container);
      });
    } else {
      console.warn('View container has already been registered');
    }
  }

  /**
   * Applies destroy listeners to container
   *
   * @param {*} container
   * @memberof UploadOverlayService
   */
  destroyContainer() {
    this.onDestroyListeners.forEach(fn => {
      fn(this.container);
    });
    this.container = undefined;
  }
}
