import app from '../server.js';
import chaiHttp from 'chai-http';
const chai = require('chai');

chai.use(chaiHttp);
/**
 * GET /word
 * returns: a single random word
 */
describe('/GET word', () => {
    it('should return a single random word', (done) => {
        chai.request(app)
            .get('/word')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.eql(1);
                done();
            });
    })
})