// This config is used in both the
// frontend as well as the web server.

// see https://github.com/askmike/gekko/blob/stable/docs/installing_gekko_on_a_server.md

const CONFIG = {
  headless: true,
  api: {
    host: '127.0.0.1',
    port: 3000,
  },
  ui: {
    ssl: true,
    host: 'v22017105055054583.bestsrv.de',
    port: 80,
    path: '/'
  },
  adapter: 'sqlite'
}

if(typeof window === 'undefined')
  module.exports = CONFIG;
else
  window.CONFIG = CONFIG;