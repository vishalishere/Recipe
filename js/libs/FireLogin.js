/* global angular, Firebase */

// custom factory for angularFire authentication to allow for route checking
angular.module("firebase")
.factory('$fireLogin',['$firebaseSimpleLogin','$rootScope',function($firebaseSimpleLogin,$rootScope)
{
    var auth,redirectURL;
    return {
        // initialization of angularFire authentication
        // @path: string - path to firebase
        // @redirect: string - route to redirect to when kicking user out of restricted area
        init: function(path,redirect)
        {
            var self = this;
            auth = $firebaseSimpleLogin(new Firebase(path));
            angular.extend(self, auth);
            redirectURL = redirect;
        },
        // check if the user is allowed on route
        resolve: function($q,$route,$location)
        {
            // setup promise
            var defer = $q.defer();

            // if the user needs to be authenticated to see the current route
            if($route.current.$$route.authRequired)
            {
                // get the user
                auth.$getCurrentUser().then(function(user)
                {
                    // if there is no user
                    if(!user)
                    {
                        // redirect to URL from init
                        $location.path(redirectURL);
                    }
                    // if there is a user
                    else
                    {
                        // set the user for everyone to use
                        $rootScope.user = user;

                        // resolve the promise
                        defer.resolve();
                    }

                });
            }
            // if the user doesn't need to be authenticated
            else
            {
                // resolve the promise
                defer.resolve();
            }

            // return the promise
            return defer.promise;
        }
    };
}])
// provider for routes to do $fireLogin resolve
.provider('$auth',function()
{
    return {
        $get: function(){},
        resolve: {
            auth: ['$fireLogin','$q','$route','$location',function($fireLogin,$q,$route,$location)
            {
                return $fireLogin.resolve($q,$route,$location);
            }]
        }

    };
});