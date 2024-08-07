import * as dotenv from 'dotenv'
import * as fs from 'fs'
import { ethers } from 'ethers'

dotenv.config()

console.log('== Testing access to the deployer key ==')

const keystorePath = process.argv[2] || (process.env.GELATO_KEYSTORE_PATH as string)
const passwordPath = process.argv[3] || (process.env.GELATO_PASSWORD_PATH as string)

console.log('   * Keystore path:', keystorePath)
console.log('   * Password path:', passwordPath || 'No password path provided')

const password = passwordPath ? fs.readFileSync(passwordPath, 'utf8').slice(0, -1) : ''
const keystore = fs.readFileSync(keystorePath, 'utf8')
const deployer = ethers.Wallet.fromEncryptedJsonSync(keystore, password)

console.log('   * Deployer:     ', deployer.address)
