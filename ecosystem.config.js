module.exports = {
  apps: [{
    name: 'trade-processor',
    script: './app.js'
  }],
  deploy: {
    production: {
      user: 'ubuntu',
      host: '34.240.11.31',
      key: '~/.ssh/trade-processor.pem',
      ref: 'origin/master',
      repo: 'git@github.com:pviotti/trade-processor.git',
      path: '/home/ubuntu/trade-processor',
      'post-deploy': 'npm install && pm2 startOrRestart ecosystem.config.js'
    }
  }
}
