MyRecipeBoxes.controller("User",['$scope','$location','angularFireCollection','angularFireAuth',function($scope,$location,angularFireCollection,angularFireAuth)
{

	// don't redirect on login
	var redirect = false;

	$scope.login = function()
	{
		// redirect on login
		redirect = true;

		// pass the user
		angularFireAuth.login("password",$scope.user);
	};

	$scope.logout = function()
	{
		angularFireAuth.logout();
	};

	$scope.create_user = function()
	{
		// redirect on login
		redirect = true;

		// create the user
		angularFireAuth.createUser($scope.user.email,$scope.user.password);
	};

	// validate that the password and confirm password match
	$scope.validatePassword = function()
	{
		// set the not matching error if the passwords don't match
		$scope.signup.confirm.$error.notMatching = $scope.user.password !== $scope.user.confirm;
	};

	$scope.$on("angularFireAuth:login", function() {

		// if the function is being called because of a login call or signup call
		if(redirect)
		{
			$location.path("/boxes");
			redirect = false;
		}

		// this means that is was called because the sure was saved, so don't redirect just load the page they are on
	});
	$scope.$on("angularFireAuth:logout", function() {
		$location.path("/");
	});

	$scope.$on("angularFireAuth:error", function(evt, err) {
		console.log('err',err);
	});

}]);