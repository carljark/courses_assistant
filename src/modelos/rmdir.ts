import fs from 'fs';
const rmdirAsync = (
  path: string,
  callback?: (err: NodeJS.ErrnoException, []?) => void,
) => {
  fs.readdir(path, (err, files) => {
    if (err) {
      // Pass the error on to callback
      callback(err, []);
      return;
    }
    const wait = files.length;
    let count = 0;
    const folderDone = (errFoderDone?: any) => {
      count++;
      // If we cleaned out all the files, continue
      if (count >= wait || errFoderDone) {
        fs.rmdir(path, callback);
      }
    };
    // Empty directory to bail early
    if (!wait) {
      folderDone();
      return;
    }

    // Remove one or more trailing slash to keep from doubling up
    path = path.replace(/\/+$/, '');
    files.forEach((file) => {
      const curPath = path + '/' + file;
      fs.lstat(curPath, (errLstat, stats) => {
        if (errLstat) {
          callback(errLstat, []);
          return;
        }
        if (stats.isDirectory()) {
          rmdirAsync(curPath, folderDone);
        } else {
            console.log('a borrar: ', curPath);
            fs.unlink(curPath, folderDone);
        }
      });
    });
  });
};

export default rmdirAsync;
