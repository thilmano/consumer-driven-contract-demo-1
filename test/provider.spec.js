const Verifier = require('@pact-foundation/pact').Verifier
const path = require('path')
const chai = require('chai')
const chaiAsPromised = require('chai-as-promised')
chai.use(chaiAsPromised)

const { server, dataStore } = require('../provider.js')

// Set the current state


server.listen(8081, () => {
  console.log('Provider service listening on http://localhost:8081')
})

// Verify that the provider meets all consumer expectations
describe('Pact Verification', () => {
  it('should validate the expectations of Our Little Consumer', () => {
    let opts = {
/* this code reads pact from local pact */
    		/*provider: 'Our Provider',
    		providerBaseUrl: 'http://localhost:8081',
    		providerStatesUrl: 'http://localhost:8081/states',
    		pactUrls: [path.resolve(process.cwd(), './pacts/our_little_consumer-our_provider.json')]*/
    		
/* this code reads pact from server pact */
    				  provider: 'Our Provider',
    				  providerBaseUrl: "http://localhost:8081",
    				  logLevel: "DEBUG",
    				  
    				  stateHandlers: {
    				        "error": () => {
    				          Promise.resolve(`Invalid `)
    				        },
    				      },
    				      
    				  // Fetch pacts from broker
    				  pactBrokerUrl: "https://employee.pact.dius.com.au/",
    				  pactBrokerToken: "qGKwQWsWHg48TPCBAkeRrA",

    				  // Fetch from broker with given tags
    			      //consumerVersionTags: ["prod"],

    			      // Tag provider with given tags
    			      //providerVersionTags: ["prod"],

    			      //publishVerificationResult: true,
    			      consumerVersion: "1.4.0",
    }

    return new Verifier(opts).verifyProvider().then(output => {
      console.log('Pact Verification Complete!')
      console.log(output)
    })
  })
})