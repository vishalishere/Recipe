MyRecipeBoxes.controller("Boxes",[
	'FIREBASE_URL',
	'$scope',
	'$firebase',
	'$rootScope',
	function(FIREBASE_URL,$scope,$firebase,$rootScope)
	{
		var boxes_ref = new Firebase(FIREBASE_URL+"boxes");
		$scope.newbox = {privacy: "public"};
		$scope.create_box = function()
		{
			$scope.boxes.$add({
				title: $scope.newbox.title,
				privacy: $scope.newbox.privacy,
				user_id: $rootScope.user.uid,
				$priority: $rootScope.user.uid,
				recipes: []
			});

			$scope.newbox = {privacy: "public"};

		};

		$scope.switch_filter = function(type)
		{

			if(type === 'user' && $rootScope.user)
			{
				$scope.my_boxes = true;
				$scope.box_filter = "";
				$scope.boxes = $firebase(boxes_ref.startAt($rootScope.user.uid).endAt($rootScope.user.uid));

			}
			else if(type === 'public' && $rootScope.user)
			{
				$scope.boxes = $firebase(boxes_ref);
				$scope.box_filter = {privacy:"public"};
				$scope.my_boxes = false;
			}

		};

		$scope.switch_filter('user');

	}]);