/* global angular, Firebase */
angular.module("firebase")
.factory('$fireLogin',['$firebaseSimpleLogin','$rootScope',function($firebaseSimpleLogin,$rootScope)
{
    var auth,redirectURL;
    return {
        init: function(path,redirect)
        {
            var self = this;
            auth = $firebaseSimpleLogin(new Firebase(path));
            angular.extend(self, auth);
            redirectURL = redirect;
        },
        resolve: function($q,$route,$location)
        {
            var defer = $q.defer();
            if($route.current.$$route.authRequired)
            {
                auth.$getCurrentUser().then(function(user)
                {

                    if(!user)
                    {
                        $location.path(redirectURL);
                    }
                    else
                    {
                        $rootScope.user = user;
                        defer.resolve();
                    }

                });
            }else
            {
                defer.resolve();
            }

            return defer.promise;
        }
    };
}])
.provider('$auth',function()
{
    return {
        $get: function(){},
        resolve: {
            Auth: ['$fireLogin','$q','$route','$location',function($fireLogin,$q,$route,$location)
            {
                return $fireLogin.resolve($q,$route,$location);
            }]
        }

    };
});