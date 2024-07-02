import fs from 'fs'

const w3fName = process.argv[2]

if (!w3fName) {
    console.error('Provide a w3f name')
    process.exit(1)
}
console.log(`Uploading ${w3fName} to IPFS...`)

const deploymentOutput = require('child_process').execSync(`npx hardhat w3f-deploy ${w3fName}`)

const cid = deploymentOutput.toString().split(' ')[8].slice(0, -4)
console.log(`New ${w3fName} CID: ${cid}`)

const ipfsDeployments = JSON.parse(fs.readFileSync('./scripts/pre-deployments.json'))
ipfsDeployments[w3fName] = cid

fs.writeFileSync('./scripts/pre-deployments.json', JSON.stringify(ipfsDeployments, null, 4).concat('\n'))
console.log('"pre-deployments.json" file successfully updated!')