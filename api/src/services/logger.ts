import Logger from 'bunyan';
import PrettyStream from 'bunyan-pretty-colors';

const logStream = new PrettyStream();
logStream.pipe(process.stdout);

const log = Logger.createLogger({
  name: 'appcues-api',
  streams: [{
    level: 'info',
    type: 'raw',
    stream: logStream
  }]
});

export const getLogger = (): Logger => log;
