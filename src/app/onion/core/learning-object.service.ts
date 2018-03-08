import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { LearningObject } from '@cyber4all/clark-entity';
import { CookieService } from 'ngx-cookie';

import { USER_ROUTES } from '@env/route';
import { AuthService } from '../../core/auth.service';

@Injectable()
export class LearningObjectService {

  learningObjects: LearningObject[] = [];
  private headers: Headers = new Headers();

  constructor(private http: Http, private auth: AuthService, private cookies: CookieService) {
    const token = this.cookies.get('presence');
    this.headers.append('Content-Type', 'application/json');
  }

  /**
   * Sends serialized Learning Object to API for creation
   * Returns new Learningbject's ID on success
   * Returns error on error
   *
   * @param {any} learningObject
   * @returns {Promise<string>}
   * @memberof LearningObjectService
   */
  create(learningObject): Promise<any> {
    console.log(LearningObject.serialize(learningObject));
    const route = USER_ROUTES.ADD_TO_MY_LEARNING_OBJECTS(this.auth.user.username);
    return this.http.post(route, { object: LearningObject.serialize(learningObject) },
      { headers: this.headers, withCredentials: true })
      .toPromise();
    // TODO: Verify this response gives the learning object name
  }
  /**
   * Fetches Learning Object by ID (full)
   *
   * @param {string} learningObjectID
   * @returns {Promise<LearningObject>}
   * @memberof LearningObjectService
   */
  getLearningObject(learningObjectName: string): Promise<any> {
    const route = USER_ROUTES.GET_LEARNING_OBJECT(this.auth.user.username, learningObjectName);
    return this.http.get(route, { headers: this.headers, withCredentials: true })
      .toPromise()
      .then((response) => {
        const object = response.json();
        const learningObject = LearningObject.unserialize(object['object']);
        learningObject['id'] = object.id;
        return learningObject;
      });
  }

  /**
   * Fetches user's Learning Objects (partial)
   *
   * @returns {Promise<LearningObject[]>}
   * @memberof LearningObjectService
   */
  getLearningObjects(): Promise<any> {
    const route = USER_ROUTES.GET_MY_LEARNING_OBJECTS(this.auth.user.username);
    return this.http.get(route, { headers: this.headers, withCredentials: true })
      .toPromise()
      .then(response => {
        return response.json().map((learningObject: string) => LearningObject.unserialize(learningObject));
      });
  }
  /**
   * Sends updated Learning Object to API for updating.
   * Returns null success.
   * Returns error on error
   *
   * @param {string} id
   * @param {LearningObject} learningObject
   * @returns {Promise<{}>}
   * @memberof LearningObjectService
   */
  save(learningObject: LearningObject): Promise<{}> {
    const route = USER_ROUTES.UPDATE_MY_LEARNING_OBJECT(this.auth.user.username, learningObject['id']);
    return this.http.patch(route, { learningObject: LearningObject.serialize(learningObject) },
      { headers: this.headers, withCredentials: true })
      .toPromise();
  }
  /**
   * Sends Learning Object's ID to API for deletion
   *
   * @param {(string)} id
   * @returns {Promise<{}>}
   * @memberof LearningObjectService
   */
  delete(learningObjectName: string): Promise<{}> {
    const route = USER_ROUTES.DELETE_LEARNING_OBJECT(this.auth.user.username, learningObjectName);
    return this.http.delete(route, { headers: this.headers, withCredentials: true }).toPromise();
  }

  /**
   * Bulk deletion
   *
   * @param {(string)[]} ids
   * @returns {Promise<{}>}
   * @memberof LearningObjectService
   */
  deleteMultiple(names: string[]): Promise<any> {
    const route = USER_ROUTES.DELETE_MULTIPLE_LEARNING_OBJECTS(this.auth.user.username, names);
    console.log(route);
    return this.http.delete(route, { headers: this.headers, withCredentials: true }).toPromise();
  }

}
