const fs = require('fs');

// files that are not found
exports.notFound = dirs => {
  let notFound = [];
  dirs.forEach(dir => {
    if (!fs.existsSync(dir)) {
      notFound.push(dir);
    }
  });
  return notFound;
};

// proper error
exports.fileNotFoundMessage = filesArr => {
    let message = `We have failed to locate ${filesArr.length} files please make sure \n`;
    filesArr.forEach(file => {
        message += `- ${file} \n`;
    });
    message += `Are existing \n`;

    return message;
};
