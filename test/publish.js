const { Publisher } = require("@pact-foundation/pact")
const path = require("path")
const opts = { 
  pactFilesOrDirs: [path.resolve(__dirname, '../pacts/')],
  pactBroker: "https://employee.pact.dius.com.au",
  pactBrokerToken: "aBnMY0kAb9wDAXQr4ix_FA",
  consumerVersion: '1.4.0',
  tags: ['prod'],
 // publishVerificationResult: true, //recommended to only publish from CI by setting the value to `process.env.CI === 'true'`
 // providerVersion: "version", //recommended to be the git sha eg. process.env.MY_CI_COMMIT
  providerVersionTag: "tag", 
  /*pactBrokerToken: "aBnMY0kAb9wDAXQr4ix_FA",
  consumerVersion:
	    '4.0.0',
  tags: ['prod'],*/
}

new Publisher(opts)
  .publishPacts()
  .then(() => {
    console.log("Pact contract publishing complete!")
    console.log("")
    console.log("Head over to https://employee.pact.dius.com.au and login with")
    console.log("to see your published contracts.")
  })
  .catch(e => {
    console.log("Pact contract publishing failed: ", e)
  })
