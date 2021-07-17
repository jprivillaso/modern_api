import fs from 'fs';

export const writeFile = (filePath: string, content: string) => new Promise((resolve, reject) => {
  fs.writeFile(filePath, content, function(err) {
    if(err) {
      reject(err);
    } else {
      resolve(content);
    }
  });
})