const { Console } = require('console');
global.console = new Console(process.stderr, process.stderr);