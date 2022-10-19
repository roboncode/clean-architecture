import { INetworkInfo } from "business/core/network/INetworkInfo"
import { NETWORK_TEST_URL } from "../../config"
import axios from 'axios'

// This is an example of a server-side network info implementation
// It is used to check if the device is connected to the internet
// This would normally be set in an environment variable to determine the frequency of the check
const interval = 1000 * 60 * 5 // 5 minutes
const url = NETWORK_TEST_URL // This is a website that will always return a 200 response
let connected = true

const checkConnection = async () => {
  try {
    await axios.get(url)
    connected = true
  } catch(error: any) {
    connected = false
  }
}

setInterval(checkConnection, interval)
checkConnection()

export class ServerNetworkInfo implements INetworkInfo {
  async isConnected(): Promise<boolean> {
    return connected
  }
}
