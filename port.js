var parseArgs = require('minimist')
// define port
let argv = parseArgs(process.argv.slice(2))

const port = argv.p || argv.port || 1122

console.log(
  '\n\033[42;37m Listening on port:\033[0m http://localhost:' + port + '\n'
)

exports.port = port
