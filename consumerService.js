const client = require('./consumer.js')

client.fetchProviderData().then(response => console.log(response))
