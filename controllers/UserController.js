MyRecipeBoxes.controller("User",['$scope','$location','angularFireCollection','angularFireAuth',function($scope,$location,angularFireCollection,angularFireAuth)
{


	$scope.login = function()
	{
		// pass the user
		angularFireAuth.login("password",$scope.user).then(function()
		{
			$location.path("/boxes");
		});
	};

	$scope.logout = function()
	{
		angularFireAuth.logout();
	};

	$scope.create_user = function()
	{
		// create the user
		angularFireAuth.createUser($scope.user.email,$scope.user.password,function(user){
			if(user)
			{
				$location.path("/boxes");
			}
		});
	};

	// validate that the password and confirm password match
	$scope.validatePassword = function()
	{
		// set the not matching error if the passwords don't match
		$scope.signup.confirm.$error.notMatching = $scope.user.password !== $scope.user.confirm;
	};

	$scope.$on("angularFireAuth:error", function(evt, err) {
		console.log('err',err);
	});
}]);