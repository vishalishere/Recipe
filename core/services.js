MyRecipeBoxes.factory("firebaseCollection",["$rootScope","$q","angularFireCollection",function($rootScope,$q,angularFireCollection)
{
	var collections = {};


	var Collection = function(url){

		var data = angularFireCollection(url);

		data.findByIds = function(ids)
		{
			var objs = [];
			for(var i=0,len = data.length; i<len; i++)
			{
				if(ids.indexOf(data[i].$id) > -1)
				{
					objs.push(data[i]);
				}
			}
			return objs;
		};

		data.getByKey  = function(key, value)
		{
			for(var i=0, len=data.length; i<len; i++)
			{
				if(data[i][key] === value)
				{
					return data[i];
				}
			}

			return false;
		}

		return data;

	};
	// put any publicly accessable methods or values inside
	return function(url,callback)
	{
		if(!collections[url])
		{
			collections[url] = new Collection(url);
		}
		if(callback)
		{
			var deferred = $q.defer();
			var interval = setInterval(function(){
				$rootScope.$apply(
					function() {
					if(collections[url].length > 0)
					{
						deferred.resolve(collections[url]);
						clearInterval(interval);
					}
				});
			},100);

			deferred.promise.then(function(data)
			{
				callback(data);
			});
		}

		return collections[url];
	};
}]);