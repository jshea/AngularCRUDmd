/*
 * Services to interact with our data storage - Server using Firebase and local via localForage
 */
/* global localforage */

angular.module("angularcrud")
   /*
    * Our controllers interact with dataFactory which is a facade for remote server data or local storage. If we have
    * a network connection, we use our REST service, otherwise we use our local storage (browser storage) service.
    */
   .factory("dataFactory", function ($rootScope, httpFactory, forageFactory, DATAKEY) {
      return {
         getAll: function (successCallback) {
            if ($rootScope.online) {
               httpFactory.getAll(successCallback);
            }
            else {
               forageFactory.getAll(successCallback);
            }
         },
         getById: function (id, successCallback) {
            if ($rootScope.online) {
               httpFactory.getById(id, successCallback);
            }
            else {
               forageFactory.getById(id, successCallback);
            }
         },
         delete: function (id) {
            if ($rootScope.online) {
               httpFactory.delete(id);
            }
            else {
               forageFactory.delete(id);
            }
         },
         update: function (id, first, last) {
            if ($rootScope.online) {
               httpFactory.update(id, first, last);
            }
            else {
               forageFactory.update(id, first, last);
            }
         },
         add: function (first, last) {
            if ($rootScope.online) {
               httpFactory.add(first, last);
            }
            else {
               forageFactory.add(first, last);
            }
         },
         updateAllContacts: function () {
            localforage.getItem(DATAKEY, function (contacts) {
               httpFactory.updateAllContacts(contacts);
            });
         }
      };
   })
   // Data interface, called by dataFactory for server storage. This is used when we have a network connection.
   .factory("httpFactory", function ($rootScope, $http, $location) {
      return {
         getAll: function (successCallback, failureCallback) {
            // Backend specific call, something like
            $rootScope.myPromise =
               $http.get($rootScope.RESTURL)
                  .success(function(data) {
                     successCallback(data);
                  })
                  .error(function (data, status, headers, config) {
                     console.log("httpFactory.getAll() Error: " + data);
                     failureCallback(config.url);
                  });
         },
         getById: function (id, successCallback) {
            // Backend specific call
         },
         delete: function (id) {
            // Backend specific call
         },
         update: function (id, first, last) {
            // Backend specific call
         },
         add: function (first, last) {
            // Backend specific call
         }
      };
   })

   // Data interface called by dataFactory for local storage. This is used when we don't have a network connection.
   .factory("forageFactory", function ($rootScope, $location, DATAKEY) {
      return {
         getAll: function (successCallback) {
            localforage.getItem(DATAKEY, successCallback);
         },
         getById: function (id, successCallback) {
            localforage.getItem(DATAKEY, function (contact) {
               successCallback(contact[id]);
            });
         },
         delete: function (id) {
            localforage.getItem(DATAKEY, function (contact) {
               delete contact[id];
               localforage.setItem(DATAKEY, contact, function (data) {
                  $rootScope.$apply(function() {
                     $location.path("/");
                  });
               });
            });
         },
         update: function (id, first, last) {
            localforage.getItem(DATAKEY, function (contact) {
               contact[id].firstname = first;
               contact[id].lastname = last;
               // Note syntax for attribute that starts with a period
               contact[id][".priority"] = last.toLowerCase() + " " + first.toLowerCase();
               localforage.setItem(DATAKEY, contact, function (data) {
                  $rootScope.$apply(function() {
                     $location.path("/view/" + id);
                  });
               });
            });
         },
         add: function (first, last) {
            // Create a dummy key.
            var id = "-";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            // Build up a key by iterating through the possible chars grabbing 20 random characters
            for (var i = 0; i < 19; ++i) {
               id += possible.charAt(Math.floor(Math.random() * possible.length));
            }

            localforage.getItem(DATAKEY, function (contact) {  // Get all localStorage data
               contact[id] = {};                                        // Create a new child element
               contact[id].firstname = first;                           // Set values for new child element
               contact[id].lastname = last;

               // Replace localStorage date with updated version
               localforage.setItem(DATAKEY, contact, function (data) {
                  $rootScope.$apply(function() {
                     $location.path("/");
                  });
               });
            });

         }
      };
   });
