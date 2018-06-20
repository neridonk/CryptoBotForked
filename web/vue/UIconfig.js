// This config is used in both the
// frontend as well as the web server.

// see https://github.com/askmike/gekko/blob/stable/docs/installing_gekko_on_a_server.md

const CONFIG = {
  headless: true,
  api: {
    host: '127.0.0.1',
    port: 8080,
    timeout: 120000 // 2 minutes
  },
  ui: {
    ssl: false,
        host: '172.30.4.239', // Set this to the IP of the machine that will run Gekko
        port: 8080,
        path: '/'
  },
  adapter: 'sqlite'
}

if (typeof window === 'undefined')
  module.exports = CONFIG;
else
  window.CONFIG = CONFIG;
