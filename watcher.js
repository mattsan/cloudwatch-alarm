'use strict'

const request = require('request')

const notify = (message, callback) => {
  const options = {
    uri: process.env.SLACK_WEBHOOK_URL,
    method: 'POST',
    json: true,
    body: {
      channel: process.env.SLACK_WEBHOOK_CHANNEL,
      username: process.env.SLACK_WEBHOOK_USERNAME,
      icon_emoji: process.env.SLACK_WEBHOOK_ICON_EMOJI,
      link_names: 1,
      text: message
    }
  }

  request(options, callback)
}

module.exports.handler = (event, context, callback) => {
  if (event.Records && event.Records[0] && event.Records[0].Sns && event.Records[0].Sns.Message) {
    notify(event.Records[0].Sns.Message, (err, res) => {
      // error handling
      console.log(JSON.stringify(err))
      console.log(JSON.stringify(res))
      callback(null)
    })
  } else {
    callback(null)
  }
}
