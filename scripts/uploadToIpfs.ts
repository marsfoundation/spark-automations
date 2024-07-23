import fs from 'fs'
import path from 'path'

function listDirectories(srcPath: string): string[] {
    return fs.readdirSync(srcPath).filter((file) => fs.statSync(path.join(srcPath, file)).isDirectory())
}

const w3fNames = listDirectories('./web3-functions')

const ipfsDeployments = JSON.parse(fs.readFileSync('./scripts/pre-deployments.json'))

for (const w3fName of w3fNames) {
    console.log(`Uploading ${w3fName} to IPFS...`)

    const deploymentOutput = require('child_process').execSync(`npx hardhat w3f-deploy ${w3fName}`)
    const cid = deploymentOutput.toString().split(' ')[8].slice(0, -4)
    console.log(`New ${w3fName} CID: ${cid}`)

    ipfsDeployments[w3fName] = cid
}

fs.writeFileSync('./scripts/pre-deployments.json', JSON.stringify(ipfsDeployments, null, 4).concat('\n'))
