'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Article = mongoose.model('Article'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  article;

/**
 * Article routes tests
 */
describe('Article Admin CRUD tests', function () {
  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      usernameOrEmail: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      roles: ['user', 'admin'],
      username: credentials.usernameOrEmail,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new article
    user.save(function () {
      article = {
        title: 'Article Title',
        content: 'Article Content'
      };

      done();
    });
  });

  it('should be able to save an article if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/module_name')
          .send(article)
          .expect(200)
          .end(function (module_nameaveErr, module_nameaveRes) {
            // Handle article save error
            if (module_nameaveErr) {
              return done(module_nameaveErr);
            }

            // Get a list of module_name
            agent.get('/api/module_name')
              .end(function (module_nameGetErr, module_nameGetRes) {
                // Handle article save error
                if (module_nameGetErr) {
                  return done(module_nameGetErr);
                }

                // Get module_name list
                var module_name = module_nameGetRes.body;

                // Set assertions
                (module_name[0].user._id).should.equal(userId);
                (module_name[0].title).should.match('Article Title');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to update an article if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/module_name')
          .send(article)
          .expect(200)
          .end(function (module_nameaveErr, module_nameaveRes) {
            // Handle article save error
            if (module_nameaveErr) {
              return done(module_nameaveErr);
            }

            // Update article title
            article.title = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing article
            agent.put('/api/module_name/' + module_nameaveRes.body._id)
              .send(article)
              .expect(200)
              .end(function (articleUpdateErr, articleUpdateRes) {
                // Handle article update error
                if (articleUpdateErr) {
                  return done(articleUpdateErr);
                }

                // Set assertions
                (articleUpdateRes.body._id).should.equal(module_nameaveRes.body._id);
                (articleUpdateRes.body.title).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an article if no title is provided', function (done) {
    // Invalidate title field
    article.title = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/module_name')
          .send(article)
          .expect(422)
          .end(function (module_nameaveErr, module_nameaveRes) {
            // Set message assertion
            (module_nameaveRes.body.message).should.match('Title cannot be blank');

            // Handle article save error
            done(module_nameaveErr);
          });
      });
  });

  it('should be able to delete an article if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/module_name')
          .send(article)
          .expect(200)
          .end(function (module_nameaveErr, module_nameaveRes) {
            // Handle article save error
            if (module_nameaveErr) {
              return done(module_nameaveErr);
            }

            // Delete an existing article
            agent.delete('/api/module_name/' + module_nameaveRes.body._id)
              .send(article)
              .expect(200)
              .end(function (articleDeleteErr, articleDeleteRes) {
                // Handle article error error
                if (articleDeleteErr) {
                  return done(articleDeleteErr);
                }

                // Set assertions
                (articleDeleteRes.body._id).should.equal(module_nameaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a single article if signed in and verify the custom "isCurrentUserOwner" field is set to "true"', function (done) {
    // Create new article model instance
    article.user = user;
    var articleObj = new Article(article);

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new article
        agent.post('/api/module_name')
          .send(article)
          .expect(200)
          .end(function (module_nameaveErr, module_nameaveRes) {
            // Handle article save error
            if (module_nameaveErr) {
              return done(module_nameaveErr);
            }

            // Get the article
            agent.get('/api/module_name/' + module_nameaveRes.body._id)
              .expect(200)
              .end(function (articleInfoErr, articleInfoRes) {
                // Handle article error
                if (articleInfoErr) {
                  return done(articleInfoErr);
                }

                // Set assertions
                (articleInfoRes.body._id).should.equal(module_nameaveRes.body._id);
                (articleInfoRes.body.title).should.equal(article.title);

                // Assert that the "isCurrentUserOwner" field is set to true since the current User created it
                (articleInfoRes.body.isCurrentUserOwner).should.equal(true);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Article.remove().exec(done);
    });
  });
});
