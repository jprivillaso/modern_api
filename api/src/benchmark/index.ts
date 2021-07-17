import apiBenchmark from 'api-benchmark';
import { writeFile } from '../utils/file';

const service = {
  api: 'http://localhost:3333/'
};

const getRandomString = (length = 10) => {
  const charset = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz';
  return new Array(length)
    .fill(null)
    .map(() => charset.charAt(Math.floor(Math.random() * charset.length)))
    .join('');
}

const routes = {
  increment: {
    method: 'post',
    route: 'increment',
    data: {
      key: getRandomString(),
      value: 1
    }
  }
};

(async () => {
  const options = {
    runMode: 'parallel',
    minSamples: 3000,
    maxConcurrentRequests: 50
  }
  apiBenchmark.measure(service, routes, options, (err: any, results: any) => {
    apiBenchmark.getHtml(results, async (_htmlError: any, html: any) => {
      await writeFile('./api_benchmark.html', html);
      console.log('Benchmark results completed!');
    });
  });
})();
