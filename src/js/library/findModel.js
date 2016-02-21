function findModel(type,mixed)
{
    var tmp = new window[type]({});
    var a = {
        url: '/'+tmp.table.replaceAll('_','-')+'/',
        //method:'POST',
        dataType:'json',
        error:function(xhr,textStatus,errorThrown){
            callback(null,xhr);
        }
    };
    
    type = window.App[type]||window[type];
    
    return new Promise(function(resolve,reject){
        if (isInt(mixed))// assume ID
        {
            // if int, we are expecting a single model
            a.url += mixed,
            a.success = function(json,textStatus,xhr)
            {
                resolve(new type(json.model),xhr);
            };
        }
        else if ($.isArray(mixed)) // assume ID array
        {
            // if array, we are expecting a collection
            // not implemented server-side
            a.data.id_list = mixed,
            a.success = function(json,textStatus,xhr)
            {
                var arr = json.collection.map(function(arr)
                {
                    return new type(arr);
                });
                
                var collection = new Collection(arr);
                
                console.info(collection);
              
                resolve(collection,xhr);
            };
        }
        
        a.error = reject;
        
        var $http = $.ajax(a);
    });
}
