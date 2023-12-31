import {
  APOD_COMMAND,
  ASTEROIDS_FEED_COMMAND,
  ASTEROIDS_LOOKUP_COMMAND
} from '@/core/helpers/constants.js'

export default {
  [APOD_COMMAND]: '/planetary/apod',
  [ASTEROIDS_FEED_COMMAND]: '/neo/rest/v1/feed',
  [ASTEROIDS_LOOKUP_COMMAND]: '/neo/rest/v1/neo'
}
