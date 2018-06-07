import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  DoCheck,
  IterableDiffers,
  HostListener,
  IterableDiffer,
  IterableChanges } from '@angular/core';
import { LearningObject, User } from '@cyber4all/clark-entity';
import { LearningObjectService } from '../core/learning-object.service';
import { DragulaService } from 'ng2-dragula';
import { DraggableComponent } from 'ng2-dnd';
import { ClarkRoutingModule } from '../../clark.routing';
import { AuthService } from '../../core/auth.service';
import { NotificationService } from '../../shared/notifications/notification.service';

@Component({
  selector: 'clark-learning-object-structure',
  templateUrl: './learning-object-structure.component.html',
  styleUrls: ['./learning-object-structure.component.scss']
})
export class LearningObjectStructureComponent implements OnInit, OnDestroy, DoCheck {

  @Input('learningObject') learningObject: LearningObject;
  @Input('user') user: User;
  @Output('close') close = new EventEmitter();
  allObjects: LearningObject[] = [];
  objectsDiffer: IterableDiffer<any[]>;
  lengthOrder = ['nanomodule', 'micromodule', 'module', 'unit', 'course'];

  // flags
  initialized = false;
  removeMode = false;
  searching = false;
  saving = 0;
  savingError = false;

  @HostListener('document:mousemove', ['$event'])
  mouseMove($event: MouseEvent) {
    if (this.removeMode) {
      const xPos = $event.clientX;
      const yPos = $event.clientY;
      const mirror = document.getElementsByClassName('gu-mirror')[0];
      const container =  document.querySelector('.object-list-container.objects');
      const dim = container.getBoundingClientRect();

      // if xPos and yPos aren't inside the objects
      if (xPos > dim.right || xPos < dim.left || yPos > dim.bottom || yPos < dim.top) {
        // outside
        mirror.classList.add('remove');
      } else {
        // inside
        mirror.classList.remove('remove');
      }
    }
  }

  constructor(
    private service: LearningObjectService,
    private dragulaService: DragulaService,
    private _iterableDiffers: IterableDiffers,
    private notificationService: NotificationService
  ) {
    this.objectsDiffer = this._iterableDiffers.find([]).create(null);
  }

  async ngOnInit() {
    // retrieve all of user's objects from database
    await this.fetchUsersObjects();
    this.initialized = true;
  }

  ngDoCheck() {
    const changes: IterableChanges<any> = this.objectsDiffer.diff(this.learningObject.children as any[]);

    if (changes && this.initialized) {
      // TODO handle reordering?

      // handle added items
      changes.forEachAddedItem(r => {
        this.saving++;
        // server call to add item
        this.service.addChild(this.learningObject.name, r.item.id).then(val => {
          this.saving--;
        }, error => {
          this.notificationService.notify('Error!', 'We couldn\'t save your changes!', 'bad', 'far fa-times');
          this.saving--;
          this.savingError = true;
          console.log(error);
        });
      });

      // handle removed items
      changes.forEachRemovedItem(r => {
        this.saving++;
        // server call to remove item
        this.service.removeChild(this.learningObject.name, r.item.id).then(val => {
          this.saving--;
        }, error => {
          this.notificationService.notify('Error!', 'We couldn\'t save your changes!', 'bad', 'far fa-times');
          this.saving--;
          this.savingError = true;
          console.log(error);
        });
      });
    }
  }

  closeFunction() {
    this.close.emit();
  }

  /**
   * Retrieves all learning objects associated with the user
   * @param query optional query parameter
   */
  async fetchUsersObjects(query?: {}) {
    this.initDrag();
    this.searching = true;
    const parentLengthOrder = this.lengthOrder.indexOf(this.learningObject.length);

    await this.service.getLearningObjects().then(val => {
      for (let i = 0, l = val.length; i < l; i++) {
        const item = val[i];
        if (parentLengthOrder > this.lengthOrder.indexOf(item.length)) {
          this.allObjects.push(item);
        }
      }
      this.searching = false;
    });
  }

  /**
   * Initializes the dragula options
   */
  private initDrag() {
    // if this drake already exists, kill it
    if (this.dragulaService.find('objects')) {
      this.dragulaService.destroy('objects');
    }

    this.dragulaService.setOptions('objects', {
      copy: (el, source) => {
        return source.className.includes('existing');
      },
      removeOnSpill: true,
      accepts: (el, target, source, sibling) => {
        return !target.className.includes('existing');
      },
      moves: (el, source, handle, sibling) => {
        return !el.className.includes('no-drag');
      }
    });

    this.dragulaService.drag.subscribe(val => {
      const source = val[2];
      if (source.className.includes('objects')) {
        this.removeMode = true;
      }
    });

    this.dragulaService.dragend.subscribe(val => {
      this.removeMode = false;
    });
  }

  ngOnDestroy() {
    this.dragulaService.destroy('objects');
  }
}
