import os from 'os'
let ip

if (os.platform() === 'win32') {
  ip = '192.168.192.129' // windows
} else if (os.platform() === 'darwin') {
  ip = '172.16.208.2' // macos
}

export default {
  baseUrl: {
    dev: 'http://localhost:36742',
    pro: `http://${ip}:12005`
  }
}
