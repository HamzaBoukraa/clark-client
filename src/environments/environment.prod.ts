export const environment = {
  production: true,
  apiURL: 'https://clark-gateway-staging.herokuapp.com/',
  STATE_STORAGE_LOCATION: 'state',
  suggestionUrl: 'https://api-outcome-suggestion.clark.center',
  contentManagerURL: 'https://clark-learning-object-service.herokuapp.com/',
  adminAppUrl: 'https://admin.clark.center'
};

export enum LearningObjectStatus {
  PUBLISHED = 'published',
  UNDER_REVIEW = 'review',
  WAITING = 'waiting',
  DENIED = 'denied',
  UNPUBLISHED = 'unpublished'
}