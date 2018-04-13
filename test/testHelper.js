const chai = require('chai');

global.expect = chai.expect;

global.proxyquire = require('proxyquire');

global.sinon = require('sinon');
const sinonChai = require('sinon-chai');

chai.use(sinonChai);
