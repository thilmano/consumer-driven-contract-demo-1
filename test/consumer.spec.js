const chai = require('chai')
const path = require('path')
const chaiAsPromised = require('chai-as-promised')
const Pact = require('@pact-foundation/pact').Pact
const { somethingLike: like, term } = require('@pact-foundation/pact').Matchers
const expect = chai.expect
const API_PORT = process.env.API_PORT || 9123
const { fetchProviderData } = require('../consumer')
chai.use(chaiAsPromised)

// Configure and import consumer API
// Note that we update the API endpoint to point at the Mock Service
const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN'

const provider = new Pact({
  consumer: 'Our Little Consumer',
  provider: 'Our Provider',
  port: API_PORT,
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: LOG_LEVEL,
  spec: 2,
})
const name = 'Tiger Nixon'
const employeeID = 'A5052880'
	

describe('Pact with Our Provider', () => {
	    describe('when a call to the Provider is made', () => {
	      before(() => {
	        return provider.setup()
	          .then(() => {
	            provider.addInteraction({
	              uponReceiving: 'a request for JSON data',
	              withRequest: {
	                method: 'GET',
	                path: '/employee',
	                query: {
		                  validID: employeeID
		                }
	              },
	              willRespondWith: {
	                status: 200,
	                headers: {
	                  'Content-Type': 'application/json; charset=utf-8'
	                	
	                },
	                body: {
	                	id: term({generate: employeeID, matcher: '\^[A-Z]{1}[0-9]{7}$'}),
	                	employee_name: 'Tiger Nixon',
	                	employee_salary: like(320800),
	                	employee_age: like(61),
	                	}
	              }
	            })
	          })
	      })

	      it('can process the JSON payload from the provider', done => {
	        const response = fetchProviderData(employeeID)

	        expect(response).to.eventually.have.property('id', employeeID).notify(done)
		      expect(response).to.eventually.have.property('employee_name', name)
		      expect(response).to.eventually.have.property('employee_salary', 320800)
		      expect(response).to.eventually.have.property('employee_age', 61)
	      })

	      it('should validate the interactions and create a contract', () => {
	        return provider.verify()
	      })
	    })

	    // Write pact files to file
	    after(() => {
	      return provider.finalize()
	    })
	  })