const request = require('superagent')
const API_HOST = process.env.API_HOST || 'http://localhost'
const API_PORT = process.env.API_PORT || 9123
const moment = require('moment')
const API_ENDPOINT = `${API_HOST}:${API_PORT}`

// Fetch provider data
	const fetchProviderData = (employeeID) => {
		  return request
		    .get(`${API_ENDPOINT}/employee`)
		    .query({validID: employeeID})
		    .then((res) => {
		      // Validate ID
		      
		        return {
		        	id: res.body.id,
		    		employee_name: res.body.employee_name,
		    		employee_salary: res.body.employee_salary,
		    		employee_age: res.body.employee_age,
		        }
		      
		    })
		}
	
module.exports = {
  fetchProviderData,
}