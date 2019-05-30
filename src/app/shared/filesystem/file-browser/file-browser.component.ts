import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  DoCheck
} from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { DirectoryNode, DirectoryTree } from '../DirectoryTree';
import { LearningObject } from '@entity';
import { getPaths } from '../file-functions';
import { TOOLTIP_TEXT } from '@env/tooltip-text';

// tslint:disable-next-line:interface-over-type-literal
export type Removal = {
  type: 'file' | 'folder';
  path: string;
};

// tslint:disable-next-line:interface-over-type-literal
export type DescriptionUpdate = {
  description: string;
  file: LearningObject.Material.File | DirectoryNode;
};

@Component({
  selector: 'clark-file-browser',
  templateUrl: 'file-browser.component.html',
  styleUrls: ['file-browser.component.scss']
})
export class FileBrowserComponent
  implements OnInit, OnChanges, DoCheck, OnDestroy {
  @Input() canManage = false;
  @Input()
  files: LearningObject.Material.File[] = [];
  @Input() folderMeta: LearningObject.Material.FolderDescription[] = [];
  @Output() path: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  containerClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output()
  newOptionsClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output()
  meatballClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output()
  descriptionUpdated: EventEmitter<DescriptionUpdate> = new EventEmitter<
    DescriptionUpdate
  >();

  private filesystem: DirectoryTree = new DirectoryTree();

  private killSub$: Subject<boolean> = new Subject();

  currentNode$: BehaviorSubject<DirectoryNode> = new BehaviorSubject(null);

  currentPath: string[] = [];
  tips = TOOLTIP_TEXT;
  view = 'list';

  constructor() {}

  ngOnInit(): void {
    this.filesystem.addFiles(this.files);
    const node = this.filesystem.traversePath([]);
    this.emitCurrentNode(node);
    this.linkFolderMeta(this.folderMeta);
  }

  ngDoCheck() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.files && !changes.files.firstChange) {
      this.filesystem = new DirectoryTree();
      this.filesystem.addFiles(this.files);
      const node = this.filesystem.traversePath([]);
      this.emitCurrentNode(node);
    }
    if (changes.folderMeta && !changes.folderMeta.firstChange) {
      this.linkFolderMeta(this.folderMeta);
    }
  }

  /**
   * Associate folder with meta data
   *
   * @private
   * @param {LearningObject.Material.FolderDescription[]} folderMeta
   * @memberof FileBrowserComponent
   */
  private linkFolderMeta(
    folderMeta: LearningObject.Material.FolderDescription[]
  ): void {
    for (const folder of folderMeta) {
      const paths = getPaths(folder.path, false);
      const node = this.filesystem.traversePath(paths);
      if (node) {
        node.description = folder.description;
      }
    }
  }
  /**
   * Set current node to path
   *
   * @param {string} path
   * @memberof FileBrowserComponent
   */
  openFolder(path: string): void {
    this.currentPath.push(path);
    const node = this.filesystem.getFolder(this.currentNode$.value, path);
    this.emitCurrentNode(node);
  }

  handlePathChanged(paths: string[]): void {
    let node;
    if (this.currentPath.length - paths.length === 1) {
      node = this.currentNode$.value.getParent();
      this.currentNode$.next(node);
      this.path.emit(this.currentPath.join('/'));
    } else {
      node = this.filesystem.traversePath(paths);
    }
    this.currentPath = paths;
    this.emitCurrentNode(node);
  }
  /**
   * Open node at current path
   *
   * @private
   * @memberof FileBrowserComponent
   */
  private emitCurrentNode(node: DirectoryNode): void {
    this.currentNode$.next(node);
    this.path.emit(this.currentPath.join('/'));
  }
  /**
   * Emit click event on container
   *
   * @param {MouseEvent} $event
   * @memberof FileBrowserComponent
   */
  emitContainerClick($event: MouseEvent): void {
    this.containerClick.emit($event);
  }
  /**
   * Emit click event on new button
   *
   * @param {MouseEvent} $event
   * @memberof FileBrowserComponent
   */
  emitNewOptionClick($event: MouseEvent): void {
    this.newOptionsClick.emit($event);
  }
  /**
   * Emit updated description and file
   *
   * @param {{ description: string; file: LearningObject.Material.File }} value
   * @memberof FileBrowserComponent
   */
  emitDesc(value: DescriptionUpdate): void {
    this.descriptionUpdated.emit(value);
  }

  ngOnDestroy() {
    this.killSub$.next(true);
    this.killSub$.unsubscribe();
  }
}
