process.env.PORT = 4500;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../index');

chai.should();
chai.use(chaiHttp);

describe('HOME', () => {
  describe('GET /', () => {
    let res = undefined;
    before(async () => {
      res = await chai.request(server).get('/');
    });

    it('Should get home page', () => {
      res.should.have.status(200);
    });
    it('Should have a greeting string', () => {
      res.text.should.be.a('string');
    });
    it('Should be a welcome greeting=', () => {
      res.text.should.include.string('Welcome to our API');
    });
  });
});
