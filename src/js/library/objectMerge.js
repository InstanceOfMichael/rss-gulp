/*
 *  Merge 2 objects
 *
 * http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
 *
 * intercepted by jQuery
 * 
 * @deprecated because it duplicates jQuery functionality
 *
 */
function objectMerge(a,b){
	return $.extend({}, a, b);
	for (var z in b)
	{
		a[z] = b[z];
	}
	return a;
}
