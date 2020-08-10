const express = require('express')
const cors = require('cors')
const moment = require('moment')
const bodyParser = require('body-parser')
const server = express()

server.use(cors())
server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use((_, res, next) => {
  res.header('Content-Type', 'application/json; charset=utf-8')
  next()
})

server.get('/employee', (req, res) => {
	  const clientID = req.query.employeeID
	  res.json({
		 id: 'Z5052880',
  		employee_name: 'Tiger Nixon',
  		employee_salary: 320800,
  		employee_age: 61,
	  })
	})
	
module.exports = {
  server, 
}