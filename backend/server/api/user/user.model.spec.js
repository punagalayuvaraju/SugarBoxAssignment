'use strict';
process.env.NODE_ENV = 'test';
let mongoose = require("mongoose");
var User = require('./user.model');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../app');
let should = chai.should();


chai.use(chaiHttp);

describe('Users', () => {
    beforeEach((done) => {
      User.remove({}, (err) => {
           done();
        });
    });

    describe('/POST /api/users/', () => {
      it('it should not POST a user without users field', (done) => {
          let user = {
          }
        chai.request(server)
            .post('/api/users/')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('errors');
                  res.body.errors.should.have.property('firstname');
                  res.body.errors.should.have.property('lastname');
                  res.body.errors.should.have.property('username');
                  res.body.errors.should.have.property('password');
                  res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
      });
      it('it should POST a user ', (done) => {
          let user = {
            firstname :'firstname',
            lastname : 'lastname',
            username: 'username',
            password: 'password'
          }
        chai.request(server)
            .post('/api/users/')
            .send(user)
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('message').eql('user successfully added!');
                  res.body.user.should.have.property('firstname');
                  res.body.user.should.have.property('lastname');
                  res.body.user.should.have.property('username');
                  res.body.user.should.have.property('password');
              done();
            });
      });
  });

  describe('/GET /api/users/getUsers', () => {
      it('it should GET all the Users', (done) => {
        chai.request(server)
            .get('/api/users/getUsers')
            .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('array');
                  res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/DELETE/:userId user', () => {
    it('it should DELETE a user given the userId', (done) => {
        let user = new User({
          firstname :'firstname',
          lastname : 'lastname',
          username: 'username',
          password: 'password'
        })
        user.save((err, user) => {
              chai.request(server)
              .delete('api/users/' + user._id)
              .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message').eql('Deleted Successfully !!!');
                    res.body.result.should.have.property('ok').eql(1);
                    res.body.result.should.have.property('n').eql(1);
                done();
              });
        });
    });
});

});