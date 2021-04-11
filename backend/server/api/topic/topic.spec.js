'use strict';
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
var Topic = require('./topic.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Topics', () => {
    beforeEach((done) => {
      Topic.remove({}, (err) => {
           done();
        });
    });

    describe('/POST /api/topics/', () => {
      it('it should not POST a topic without topic and Description field', (done) => {
          let topicObj = {
          }
        chai.request(server)
            .post('/api/topics/')
            .send(topicObj)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('topic');
                  res.body.errors.should.have.property('description');
                  res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST a topic ', (done) => {
          let topicObj = {
            topic :'topic',
            description : 'description'
          }
        chai.request(server)
            .post('/api/topics/')
            .send(topicObj)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('user successfully added!');
                  res.body.book.should.have.property('topic');
                  res.body.book.should.have.property('description');
              done();
            });
      });
  });

  describe('/GET /api/topics/:id', () => {
    const userId = 234243242423432;
      it('it should GET all the topics of user', (done) => {
        chai.request(server)
            .get('/api/topics/'+ userId)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
                  res.body.should.have.property('userId').eql(userId);
              done();
            });
      });
  });

});