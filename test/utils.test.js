const chai = require('chai');
const mockFiles = require('mock-fs');
const utils = require('../src/utils');

const expect = chai.expect;

describe('Utils check for unfound files', () => {
  before(() => {
    mockFiles({
      'test/dir/images': {
        'earth.png': new Buffer.from([8, 6, 7, 5, 3, 0, 9]),
        'sky.jpeg': new Buffer.from([8, 6, 7, 5, 3, 0, 9]),
        'air.jpg': new Buffer.from([8, 6, 7, 5, 3, 0, 9]),
      },
    });
  });
  after(() => {
    mockFiles.restore();
  });

  it('Should find all files and return empty array as not found', () => {
    const files = [
      'test/dir/images/earth.png',
      'test/dir/images/sky.jpeg',
      'test/dir/images/air.jpg',
    ];
    expect(utils.notFound(files).length).to.equal(0);
  });

  it('Should find 1 missing image', () => {
    const files = [
      'test/dir/images/earth.png',
      'test/dir/images/sky.jpeg',
      'test/dir/images/air.jpg',
      'test/dir/images/hello.jpg',
    ];
    expect(utils.notFound(files).length).to.equal(1);
    expect(utils.notFound(files)[0]).to.equal('test/dir/images/hello.jpg');
  });

  it('Should generate a relevant message', () => {
    const files = [
      'test/dir/images/earth.png',
      'test/dir/images/sky.jpeg',
      'test/dir/images/air.jpg',
      'test/dir/images/hello.jpg',
    ];
    let notFound = utils.notFound(files);
    expect(utils.fileNotFoundMessage(notFound)).to.contain('failed to locate 1 files');
    expect(utils.fileNotFoundMessage(notFound)).to.contain('- test/dir/images/hello.jpg');
  });
});
