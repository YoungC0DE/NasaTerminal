export const HELP_COMMAND = '/help'
export const ABOUT_COMMAND = '/about'
export const CLEAR_COMMAND = '/clear'
export const WHOAMI_COMMAND = '/whoami'

export const REFERENCES = {
  Owner: 'https://github.com/YoungC0DE',
  chatGPT: 'https://chat.openai.com',
  Repository: 'https://github.com/YoungC0DE/NasaTerminal',
  NasaAPI: 'https://api.nasa.gov/'
}

export const THEMES = [
  {id: 1, name: 'green'},
  {id: 2, name: 'yellow'},
  {id: 3, name: 'red'},
]

export const APOD_COMMAND = 'APOD'
export const ASTEROIDS_FEED_COMMAND = 'ASTEROIDS_FEED'
export const ASTEROIDS_LOOKUP_COMMAND = 'ASTEROIDS_LOOKUP'

export const COMMANDS = [
  {
    name: APOD_COMMAND,
    details:
      'This endpoint structures the APOD imagery and associated metadata so that it can be repurposed for other applications',
    params: [
      { name: 'date', format: 'YYYY-MM-DD', description: 'The date of the APOD image to retrieve' },
      {
        name: 'start_date',
        format: 'YYYY-MM-DD',
        description:
          'The start of a date range, when requesting date for a range of dates. Cannot be used with date.'
      },
      {
        name: 'end_date',
        format: 'YYYY-MM-DD',
        description: 'The end of the date range, when used with start_date.'
      },
      {
        name: 'count',
        format: 'int',
        description:
          'If this is specified then count randomly chosen images will be returned. Cannot be used with date or start_date and end_date.'
      },
      {
        name: 'thumbs',
        format: 'bool',
        description:
          'Return the URL of video thumbnail. If an APOD is not a video, this parameter is ignored.'
      }
    ]
  },
  {
    name: ASTEROIDS_FEED_COMMAND,
    details: 'Retrieve a list of Asteroids based on their closest approach date to Earth',
    params: [
      {
        name: 'start_date',
        format: 'YYYY-MM-DD',
        description: 'Starting date for asteroid search'
      },
      { name: 'end_date', format: 'YYYY-MM-DD', description: 'Ending date for asteroid search' }
    ]
  },
  {
    name: ASTEROIDS_LOOKUP_COMMAND,
    details: 'Retrieve a list of Asteroids based on their closest approach date to Earth',
    params: [
      {
        name: 'start_date',
        format: 'YYYY-MM-DD',
        description: 'Starting date for asteroid search'
      },
      { name: 'end_date', format: 'YYYY-MM-DD', description: 'Ending date for asteroid search' }
    ]
  }
]
