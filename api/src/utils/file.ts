import fs from 'fs';

export const writeFile = (
  filePath: string,
  content: string
): Promise<string> => new Promise((resolve, reject) => {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      reject(err);
    } else {
      resolve(content);
    }
  });
});
