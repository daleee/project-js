(function() {

'use strict';

var services = angular.module('ProjectJS.services', ['ngResource']);

PJS.factories = {
  dir: 'api/',

  resourceUrls: {
    'Project': 'project/:id',
    'User': 'user/:id',
    'Login': 'login',
    'WorkBreakdown': 'project/:projectId/workbreakdown/:id',
    'WorkPackage': 'project/:projectId/workpackage/:id',
    'Milestone': 'project/:projectId/milestone/:id',
    'WorkItem': 'project/:projectId/workitem/:id'
  },

  init: function() {
    for (var resourceName in this.resourceUrls) {
      this.initFactory(resourceName);
    };
  },

  initFactory: function(resourceName) {
    var that = this;
    var dir = this.dir;
    var resourceUrl = this.resourceUrls[resourceName];

    this.items[resourceName] = function($resource) {
      return that.createResource($resource, resourceName, $resource(dir + resourceUrl, {}, {
        _get: {method: 'GET'},
        _query: {method: 'GET', params: {}, isArray: true}
      }));
    };

    services.factory(resourceName, this.items[resourceName]);
  },

  items: {},

  createResource: function($resource, resourceName, resource) {
    var that = this;

    resource.get = function() {
      var deferredResource = new resource();
      var options = getResourceOptions(arguments);
      resource._get(options.params, that.handleResourceGet(
        $resource, resourceName, options, resource, deferredResource), function(data) {
        if (options.error) return options.error(data);
      });
      return deferredResource;
    };

    resource.query = function() {
      var deferredResource = [];
      var options = getResourceOptions(arguments);
      resource._query(options.params, that.handleResourceQuery(
        $resource, resourceName, options, resource, deferredResource), function(data) {
        if (options.error) return options.error(data);
      });
      return deferredResource;
    };

    return resource;
  },

  handleResourceGet: function($resource, resourceName, options, resource, deferredResource) {
    var that = this;
    return function(data) {
      if (PJS.ViewModels[resourceName]) {
        data = PJS.ViewModels[resourceName](data);
      }
      if (!options.light) that.handleRelations($resource, resourceName, options, resource, data);
      handleDeferred(resource, deferredResource, data);
      if (options.success) return options.success(deferredResource);
    };
  },

  handleResourceQuery: function($resource, resourceName, options, resource, deferredResource) {
    var that = this;
    return function(data) {
      var newData = [];
      var hasViewModel = !!PJS.ViewModels[resourceName];
      data.forEach(function(resource) {
        var newResource = hasViewModel ? PJS.ViewModels[resourceName](resource) : resource;
        newData.push(newResource);
        if (!options.light) that.handleRelations($resource, resourceName, options, resource, newResource);
      });
      handleDeferred(resource, deferredResource, newData);
      if (options.success) return options.success(deferredResource);
    };
  },

  handleRelations: function($resource, resourceName, options, resource, data) {
    if (PJS.Controllers[resourceName] && PJS.Controllers[resourceName].relations) {
      var camelResourceName = PJS.Utilities.toCamelCase(resourceName);
      for (var relation in PJS.Controllers[resourceName].relations) {
        var type = PJS.Controllers[resourceName].relations[relation];
        var ResourceType = this.items[type]($resource);
        var relations = data[relation];
        if (typeof relations === 'object') {
          var newRelations = relations instanceof Array ? [] : {};
          for (var key in relations) {
            if (relations.hasOwnProperty(key)) {
              var attrs = angular.extend({}, options.params, {id: relations[key]});
              attrs[camelResourceName + 'Id'] = options.params ? options.params.id : '';
              if (!options.tree) attrs.light = true;
              data[relation] = ResourceType.get(attrs);
            }
          }
        } else {
          var attrs = angular.extend({}, options.params, {id: data[relation]});
          attrs[camelResourceName + 'Id'] = options.params ? options.params.id : '';
          if (!options.tree) attrs.light = true;
          data[relation] = ResourceType.get(attrs);
        }
      }
    }
    this.handleReverseRelations($resource, resourceName, options, resource, data);
  },

  handleReverseRelations: function($resource, resourceName, options, resource, data) {
    if (PJS.Controllers[resourceName] && PJS.Controllers[resourceName].reverseRelations) {
      for (var relation in PJS.Controllers[resourceName].reverseRelations) {
        var relationObj = PJS.Controllers[resourceName].reverseRelations[relation];
        var type = relationObj.type;
        var ResourceType = this.items[type]($resource);
        data[relation] = data[relation] || [];
        ResourceType.query(options.params, function(relatedResource) {
          relatedResource.forEach(function(related) {
            if (related[relationObj.relation] instanceof Array) {
              if (related[relationObj.relation].indexOf(data._id) !== -1) {
                data[relation].push(related);
              }
            } else if (related[relationObj.relation] === data._id) {
              data[relation].push(related);
            }
          });
        });
      }
    }
  }
};

PJS.factories.init();

var noop = function() {};

var isFunction = function(param) {
  return typeof param === 'function';
};

var handleDeferred = function(resource, deferredResource, data) {
  if (deferredResource instanceof Array && data instanceof Array) {
    data.forEach(function(res) {
      deferredResource.push(angular.extend(new resource(), res));
    });
  } else {
    angular.extend(deferredResource, data);
  }
};

var getResourceOptions = function(args, hasBody) {
  var params = {};
  var data;
  var success = noop;
  var error = null;
  switch(args.length) {
    case 4:
      error = args[3];
      success = args[2];
      //fallthrough
    case 3:
    case 2:
      if (isFunction(args[1])) {
        if (isFunction(args[0])) {
          success = args[0];
          error = args[1];
          break;
        }

        success = args[1];
        error = args[2];
        //fallthrough
      } else {
        params = args[0];
        data = args[1];
        success = args[2];
        break;
      }
    case 1:
      if (isFunction(args[0])) success = args[0];
      else if (hasBody) data = args[0];
      else params = args[0];
      break;
    case 0: break;
    default:
      throw "Expected between 0-4 arguments [params, data, success, error], got " +
        arguments.length + " arguments.";
  }
  return {params: params, success: success, data: data, error: error};
};

})();