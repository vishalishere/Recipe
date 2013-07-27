MyRecipeBoxes.controller("User",['$scope','$location','angularFireCollection','angularFireAuth',function($scope,$location,angularFireCollection,angularFireAuth)
{

	$scope.log_user = function()
	{
		angularFireAuth.login("password",{'email':$scope.user.email,'password':$scope.user.password});
	}
	$scope.logout = function()
	{
		angularFireAuth.logout();
	}


	$scope.$on("angularFireAuth:login", function(evt, user) {
	  	$location.path("/app");
	});
	$scope.$on("angularFireAuth:logout", function(evt, user) {
	  	$location.path("/");
	});

	$scope.$on("angularFireAuth:error", function(evt, err) {
	  console.log('err',err);
	});

}]);