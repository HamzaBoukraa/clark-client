import { environment } from '@env/environment';
import * as querystring from 'querystring';

export type MaterialsFilter = 'released' | 'unreleased';

export const ADMIN_ROUTES = {
  MUTATE_COLLECTION_MEMBERSHIP(abvCollectionName: string, userId: string): string {
    return `${environment.apiURL}/collections/${encodeURIComponent(
      abvCollectionName
    )}/members/${encodeURIComponent(userId)}`;
  },
  GET_USER_ROLES(id: string): string {
    return `${environment.apiURL}/users/${encodeURIComponent(id)}/roles`;
  },
  GET_MAPPERS(): string {
    return `${environment.apiURL}/guidelines/members`;
  },
  ADD_MAPPER(userId: string): string {
    return `${environment.apiURL}/guidelines/members/${encodeURIComponent(userId)}`;
  },
  REMOVE_MAPPER(userId: string): string {
    return `${environment.apiURL}/guidelines/members/${encodeURIComponent(userId)}`;
  }
};

export const CHANGELOG_ROUTES = {
  CREATE_CHANGELOG(userId: string, learningObjectCuid: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(userId)}/learning-objects/${encodeURIComponent(learningObjectCuid)}/changelog`;
  },
  FETCH_ALL_CHANGELOGS(params: {
    userId: string, learningObjectCuid: string, minusRevision?: boolean,
  }) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.userId,
    )}/learning-objects/${encodeURIComponent(
      params.learningObjectCuid,
    )}/changelogs?minusRevision=${params.minusRevision}`;
  }
};

export const USER_ROUTES = {
  LOGIN: `${environment.apiURL}/users/tokens`,
  REGISTER: `${environment.apiURL}/users`,
  EDIT_USER_INFO: `${environment.apiURL}/users`,
  FETCH_USER(username: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(username)}`;
  },
  CHECK_USER_EXISTS(username) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/profile`;
  },
  FETCH_MEMBERS(collection: string, query: any) {
    return `${environment.apiURL}/collections/${encodeURIComponent(
      collection
    )}/members?${querystring.stringify(query)}`;
  },
  ASSIGN_COLLECTION_MEMBER(collection: string, memberId: string) {
    return `${environment.apiURL}/collections/${encodeURIComponent(
      collection
    )}/members/${encodeURIComponent(
      memberId
    )}`;
  },
  UPDATE_COLLECTION_MEMBER(collection: string, memberId: string) {
    return `${environment.apiURL}/collections/${encodeURIComponent(
      collection
    )}/members/${encodeURIComponent(
      memberId
    )}`;
  },
  REMOVE_COLLECTION_MEMBER(collection: string, memberId: string) {
    return `${environment.apiURL}/collections/${encodeURIComponent(
      collection
    )}/members/${encodeURIComponent(
      memberId
    )}`;
  },
  LOAD_USER_PROFILE(username: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects/profile`;
  },
  SEARCH_USERS(query: {}) {
    return `${environment.apiURL}/users/search?text=${encodeURIComponent(querystring.stringify(query))}`;
  },
  VALIDATE_TOKEN(username) {
    return `${environment.apiURL}/users/${encodeURIComponent(username)}/tokens`;
  },
  LOGOUT(username) {
    return `${environment.apiURL}/users/${encodeURIComponent(username)}/tokens`;
  },
  GET_MY_LEARNING_OBJECTS(username, filters: any, query: string) {
    // Onion
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects?children=true&text=${encodeURIComponent(query)}&${querystring.stringify(filters)}`;
  },
  GET_MY_DRAFT_LEARNING_OBJECTS(username, filters: any, query: string) {
    // Onion Dashboard
    return `${environment.apiURL}/users/${encodeURIComponent(username)}/learning-objects?text=${encodeURIComponent(query
    )}&${querystring.stringify(filters)}&draftsOnly=true`;
  },
  GET_LEARNING_OBJECT_REVISION(username, learningObjectId, revisionId) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username)}/learning-objects/${encodeURIComponent(
        learningObjectId)}/revisions/${encodeURIComponent(revisionId)}`;
  },
  ADD_TO_MY_LEARNING_OBJECTS(username) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects`;
  },
  CREATE_REVISION_OF_LEARNING_OBJECT(username, cuid) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects/${encodeURIComponent(
      cuid
    )}/versions`;
  },
  UPDATE_MY_LEARNING_OBJECT(username, learningObjectName) {
    return `${
      environment.apiURL
      }/users/${username}/learning-objects/${encodeURIComponent(
        learningObjectName
      )}`;
  },
  SUBMIT_LEARNING_OBJECT(params: {
    userId: string,
    learningObjectId: string
  }) {
    return `${
      environment.apiURL
      }/users/${params.userId}/learning-objects/${params.learningObjectId}/submissions`;
  },
  UNSUBMIT_LEARNING_OBJECT(params: {
    userId: string,
    learningObjectId: string
  }) {
    return `${
      environment.apiURL
      }/users/${params.userId}/learning-objects/${params.learningObjectId}/submissions`;
  },
  CHECK_FIRST_SUBMISSION(params: {
    userId: string,
    learningObjectId: string,
    query: {
      collection: string,
      hasSubmission: boolean
    },
  }) {
    const q = 'collection=' + params.query.collection + '&hasSubmission=' + params.query.hasSubmission;
    return `${
      environment.apiURL
      }/users/${params.userId}/learning-objects/${params.learningObjectId}/submissions?${q}`;
  },
  ADD_LEARNING_OBJET_TO_COLLECTION(learningObjectId: string) {
    return `${environment.apiURL}/learning-objects/${encodeURIComponent(
      learningObjectId
    )}/collections`;
  },
  GET_LEARNING_OBJECT(id) {
    return `${environment.apiURL}/learning-objects/${encodeURIComponent(id)}`;
  },
  DELETE_LEARNING_OBJECT(username: string, id: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects/${encodeURIComponent(id)}`;
  },
  DELETE_MULTIPLE_LEARNING_OBJECTS(username, learningObjectNames) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects/multiple/${encodeURIComponent(learningObjectNames)}`;
  },
  POST_FILE_TO_LEARNING_OBJECT(id: string, username: string) {
    return `${environment.contentManagerURL}/users/${encodeURIComponent(
      username
    )}/learning-objects/${id}/files`;
  },
  POST_FILE_TO_LEARNING_OBJECT_ADMIN(id: string, username: string) {
    return `${environment.contentManagerURLAdmin}/users/${encodeURIComponent(
      username
    )}/learning-objects/${id}/files`;
  },
  DELETE_FILE_FROM_LEARNING_OBJECT({
    authorUsername,
    learningObjectId,
    fileId
  }: {
    authorUsername: string;
    learningObjectId: string;
    fileId: string;
  }) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      authorUsername
    )}/learning-objects/${encodeURIComponent(
      learningObjectId
    )}/materials/files/${encodeURIComponent(fileId)}`;
  },
  GET_OUTCOMES(username: string, learningObjectId: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(username)}/learning-objects/
      ${encodeURIComponent(learningObjectId)}/outcomes`;
  },
  MODIFY_MY_OUTCOME(learningObjectId: string, outcomeId: string, username: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(username)}/learning-objects/${encodeURIComponent(
      learningObjectId
    )}/outcomes/${encodeURIComponent(outcomeId)}`;
  },
  CREATE_AN_OUTCOME(learningObjectId: string, username: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(username)}/learning-objects/${encodeURIComponent(
      learningObjectId
    )}/outcomes`;
  },
  DELETE_OUTCOME(learningObjectId: string, outcomeId: string, username: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(username)}/learning-objects/${encodeURIComponent(
      learningObjectId
    )}/outcomes/${encodeURIComponent(outcomeId)}`;
  },
  POST_MAPPING(username: string, learningObjectId: string, outcomeId: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(username)}/learning-objects/${encodeURIComponent(
      learningObjectId
      )}/outcomes/${encodeURIComponent(outcomeId)}/mappings`;
  },
  DELETE_MAPPING(username: string, learningObjectId: string, outcomeId: string, mappingsId: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(username)}/learning-objects/${encodeURIComponent(
      learningObjectId
      )}/outcomes/${encodeURIComponent(outcomeId)}/mappings/${encodeURIComponent(mappingsId)}`;
  },
  GET_CART(username, page?, limit?) {
    // CUBE
    return `${environment.apiURL}/users/${encodeURIComponent(username)}/library/learning-objects?page=${page}&limit=${limit}`;
  },
  CLEAR_LEARNING_OBJECT_FROM_CART(username, cuid) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/library/learning-objects/${encodeURIComponent(cuid)}`;
  },
  ADD_LEARNING_OBJECT_TO_CART(username) {
    return `${environment.apiURL}/users/${encodeURIComponent(username)}/library/learning-objects`;
  },
  DOWNLOAD_OBJECT(username: string, learningObjectCuid: string, version: number) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects/${encodeURIComponent(learningObjectCuid)}/versions/${encodeURIComponent(version.toString())}/bundle`;
  },
  GET_SAME_ORGANIZATION(organization) {
    return `${
      environment.apiURL
      }/users/search?organization=${encodeURIComponent(organization)}`;
  },
  VALIDATE_CAPTCHA() {
    return `${environment.apiURL}/users/validate-captcha`;
  },
  SET_CHILDREN(username, learningObjectName) {
    return `${environment.apiURL}/learning-objects/${encodeURIComponent(
      username
    )}/${encodeURIComponent(learningObjectName)}/children`;
  },
  UPDATE_PDF(username: string, id: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects/${id}/pdf`;
  },
  UPDATE_FILE_DESCRIPTION(username: string, objectId: string, fileId: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects/${objectId}/materials/files/${encodeURIComponent(
      fileId
    )}`;
  },
  GET_MATERIALS(username: string, objectId: string, filter?: MaterialsFilter) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects/${objectId}/materials?status=${filter}`;
  },
  ADD_FILE_META(username: string, objectId: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects/${objectId}/materials/files`;
  },
  GET_CHILDREN(learningObjectID: string) {
    return `${environment.apiURL}/learning-objects/${encodeURIComponent(
      learningObjectID
    )}/children/summary`;
  },
  GET_METRICS(username: string, learningObjectID: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects/${encodeURIComponent(
      learningObjectID
    )}/metrics`;
  },
  INIT_MULTIPART(params: {
    username: string;
    objectId: string;
    fileId: string;
  }) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username
    )}/learning-objects/${params.objectId}/files/${params.fileId}/multipart`;
  },
  INIT_MULTIPART_ADMIN(params: {
    username: string;
    objectId: string;
    fileId: string;
  }) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username
    )}/learning-objects/${params.objectId}/files/${params.fileId}/multipart/admin`;
  },
  FINALIZE_MULTIPART(params: {
    username: string;
    objectId: string;
    fileId: string;
  }) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username
    )}/learning-objects/${params.objectId}/files/${params.fileId}/multipart`;
  },
  FINALIZE_MULTIPART_ADMIN(params: {
    username: string;
    objectId: string;
    fileId: string;
    uploadId: string;
  }) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username
    )}/learning-objects/${params.objectId}/files/${params.fileId}/multipart/${
      params.uploadId
      }/admin`;
  },
  ABORT_MULTIPART(params: {
    username: string;
    objectId: string;
    fileId: string;
  }) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username
    )}/learning-objects/${params.objectId}/files/${params.fileId}/multipart`;
  },
  ABORT_MULTIPART_ADMIN(params: {
    username: string;
    objectId: string;
    fileId: string;
    uploadId: string;
  }) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username
    )}/learning-objects/${params.objectId}/files/${params.fileId}/multipart/${
      params.uploadId
      }/admin`;
  },
  GET_NOTIFICATIONS(params: {
    username: string,
    page: number,
    limit: number,
  }): string {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username,
    )}/notifications?page=${encodeURIComponent(
      params.page.toString(),
    )}&limit=${encodeURIComponent(
      params.limit.toString(),
    )}`;
  },
  DELETE_NOTIFICATION(params: {
    username: string,
    id: string,
  }): string {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username,
    )}/notifications/${encodeURIComponent(
      params.id,
    )}`;
  },
};

export const PUBLIC_LEARNING_OBJECT_ROUTES = {
  GET_PUBLIC_LEARNING_OBJECTS: `${environment.apiURL}/learning-objects`,
  GET_PUBLIC_LEARNING_OBJECTS_WITH_FILTER(query) {
    return `${environment.apiURL}/learning-objects?${query}`;
  },
  GET_PUBLIC_LEARNING_OBJECT(author: string, cuid: string, version?: number) {
    let uri = `${environment.apiURL}/users/${encodeURIComponent(author)}/learning-objects/${encodeURIComponent(cuid)}`;

    if (version !== undefined) {
      uri += '?version=' + version.toString();
    }

    return uri;
  },
  GET_COLLECTIONS: `${environment.apiURL}/collections`,
  GET_COLLECTION_META(name: string) {
    return `${environment.apiURL}/collections/${encodeURIComponent(name)}/meta`;
  },
  GET_USERS_PUBLIC_LEARNING_OBJECTS(username: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/learning-objects`;
  },
  GET_LEARNING_OBJECT_PARENTS(username: string, id: string) {
    return `${environment.apiURL}/users/${username}/learning-objects/${id}/parents`;
  },
  DOWNLOAD_FILE(params: {
    username: string;
    loId: string;
    fileId: string;
    open?: boolean;
  }) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username
    )}/learning-objects/${params.loId}/files/${params.fileId}/download${
      params.open ? '?open=true' : ''
      }`;
  }
};

export const RATING_ROUTES = {
  DELETE_RATING(params: {
    username: string;
    CUID: string;
    version: number;
    ratingId: string;
  }) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username,
    )}/learning-objects/${encodeURIComponent(
      params.CUID,
    )}/version/${encodeURIComponent(
      params.version.toString(),
    )}/ratings/${encodeURIComponent(
      params.ratingId
    )}`;
  },
  EDIT_RATING(params: {
    username: string;
    CUID: string;
    version: number;
    ratingId: string;
  }): string {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username,
    )}/learning-objects/${encodeURIComponent(
      params.CUID,
    )}/version/${encodeURIComponent(
      params.version.toString(),
    )}/ratings/${encodeURIComponent(
      params.ratingId
    )}`;
  },
  CREATE_RESPONSE(params: {
    username: string;
    CUID: string;
    version: number;
    ratingId: string;
  }): string {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username,
    )}/learning-objects/${encodeURIComponent(
      params.CUID
    )}/version/${encodeURIComponent(
      params.version.toString(),
    )}/ratings/${encodeURIComponent(
      params.ratingId
    )}/responses`;
  },
  GET_RESPONSE(params: { learningObjectId: string; ratingId: string }) {
    return `${environment.apiURL}/learning-objects/${encodeURIComponent(
      params.learningObjectId
    )}/ratings/${encodeURIComponent(params.ratingId)}/responses`;
  },
  UPDATE_RESPONSE(params: {
    username: string;
    CUID: string;
    version: number;
    ratingId: string;
    responseId: string;
  }): string {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username,
    )}/learning-objects/${encodeURIComponent(
      params.CUID,
    )}/version/${encodeURIComponent(
      params.version.toString(),
    )}/ratings/${encodeURIComponent(
      params.ratingId
    )}/responses/${encodeURIComponent(
      params.responseId
    )}`;
  },
  DELETE_RESPONSE(params: {
    username: string;
    CUID: string;
    version: number;
    ratingId: string;
    responseId: string;
  }): string {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username,
    )}/learning-objects/${encodeURIComponent(
      params.CUID,
    )}/version/${encodeURIComponent(
      params.version.toString(),
    )}/ratings/${encodeURIComponent(
      params.ratingId
    )}/responses/${encodeURIComponent(
      params.responseId
    )}`;
  },
  CREATE_RATING(params: {
    username: string;
    CUID: string;
    version: number;
  }) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username,
    )}/learning-objects/${encodeURIComponent(
      params.CUID,
    )}/version/${encodeURIComponent(
      params.version.toString(),
    )}/ratings`;
  },
  GET_LEARNING_OBJECT_RATINGS(params: {
    username: string;
    CUID: string;
    version: number;
  }): string {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username,
    )}/learning-objects/${encodeURIComponent(
      params.CUID,
    )}/version/${encodeURIComponent(
      params.version.toString(),
    )}/ratings`;
  },
  FLAG_LEARNING_OBJECT_RATING(params: {
    username: string;
    CUID: string;
    version: number;
    ratingId: string;
  }): string {
    return `${environment.apiURL}/users/${encodeURIComponent(
      params.username,
    )}/learning-objects/${encodeURIComponent(
      params.CUID,
    )}/version/${encodeURIComponent(
      params.version.toString(),
    )}/ratings/${encodeURIComponent(
      params.ratingId
    )}/flags`;
  },
  GET_USER_RATINGS(username: string) {
    return `${environment.apiURL}/users/${encodeURIComponent(
      username
    )}/ratings`;
  }
};
export const MISC_ROUTES = {
  CHECK_STATUS: `${environment.apiURL}/status`,
  CHECK_MAINTENANCE: `${environment.apiURL}/maintenance`
};

export const STATS_ROUTES = {
  // fetches stats for all objects in the system
  LEARNING_OBJECT_STATS: `${environment.apiURL}/learning-objects/stats`,
  // fetches downloads and saves for ALL objects in system
  LIBRARY_METRICS: `${environment.apiURL}/learning-objects/metrics`,
  // fetches the blooms distribution
  OUTCOMES_STATS: `${environment.apiURL}/outcomes/stats`,
  USERS_STATS: `${environment.apiURL}/users/stats` // nothing new
};

export const FEATURED_ROUTES = {
  // sets the featured objects
  SET_FEATURED: `${environment.apiURL}/featured/learning-objects`,
  // retrieves the featured objects
  GET_FEATURED: `${environment.apiURL}/featured/learning-objects`,
};
