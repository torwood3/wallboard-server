'use strict';

var expect = require('chai').expect;

var article = require('../../../app/models/device');

describe('article', function() {
  it('should load', function() {
    expect(article).to.be.a('function');
  });
});
