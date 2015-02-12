(function() {
  var Collection, Model, OrderedCollection, folds, util, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  Model = require('../model/model').Model;

  folds = require('./folds');

  util = require('../util/util');

  Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      _ref = Collection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Collection.prototype.filter = function(f) {
      return new (require('./filtered-list').FilteredList)(this, f);
    };

    Collection.prototype.map = function(f) {
      return new (require('./mapped-list').MappedList)(this, f);
    };

    Collection.prototype.concat = function() {
      var lists;

      lists = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (util.isArray(lists[0]) && lists.length === 1) {
        lists = lists[0];
      }
      return new (require('./catted-list').CattedList)([this].concat(lists));
    };

    Collection.prototype.partition = function(f) {
      return new (require('./partitioned-list').PartitionedList)(this, f);
    };

    Collection.prototype.uniq = function(options) {
      return new (require('./uniq-list').UniqList)(this, options);
    };

    Collection.prototype.react = function(f) {
      return this.on('added', f);
    };

    Collection.prototype.any = function(f) {
      return folds.any(new (require('./mapped-list').MappedList)(this, f));
    };

    Collection.prototype.fold = function(memo, f) {
      return folds.fold(this, memo, f);
    };

    Collection.prototype.scanl = function(memo, f) {
      return folds.scanl(this, memo, f);
    };

    Collection.prototype.foldl = function(memo, f) {
      return folds.foldl(this, memo, f);
    };

    Collection.prototype.min = function() {
      return folds.min(this);
    };

    Collection.prototype.max = function() {
      return folds.max(this);
    };

    Collection.prototype.sum = function() {
      return folds.sum(this);
    };

    Collection.prototype.join = function(joiner) {
      return folds.join(this, joiner);
    };

    Collection.prototype.reactNow = function(f) {
      var elem, _i, _len, _ref1;

      _ref1 = this.list;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        elem = _ref1[_i];
        f(elem);
      }
      return this.on('added', f);
    };

    return Collection;

  })(Model);

  OrderedCollection = (function(_super) {
    __extends(OrderedCollection, _super);

    function OrderedCollection() {
      _ref1 = OrderedCollection.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return OrderedCollection;

  })(Collection);

  util.extend(module.exports, {
    Collection: Collection,
    OrderedCollection: OrderedCollection
  });

}).call(this);
