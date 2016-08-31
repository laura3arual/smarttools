'use strict';

/*
 * Defining the Package
 */
var Module = require('meanio').Module;

var SmartTools = new Module('smartTools');
/*
 * All MEAN packages require registration
 * Dependency injection is used to define required modules
 */
SmartTools.register(function(app, users, system, database) {

  var userModel = database.connection.model('User');
  userModel.schema.add({ company: {type: String, required: true}}, '');

  SmartTools.controller = require('./server/controllers/smartTools')(SmartTools, app);

  // Set views path, template engine and default layout
  app.set('views', __dirname + '/server/views');

  SmartTools.routes(app, users, system);

  SmartTools.angularDependencies(['mean.system', 'mean.users', 'ngFileUpload']);

  return SmartTools;
});
