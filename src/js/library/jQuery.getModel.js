/**
 * jQuery addon to attempt to get the javascript model from the DOM
 * 
 * @todo promises
 */
jQuery.fn.getModel = function()
{
    var data = this.data();
    return new Promise(function(resolve,reject)
    {
        //console.log(data);
        
        if (data.fp && data.fp.indexOf('_'))
        {
            var modelClass = data.fp.substr(0,data.fp.indexOf('_'));
            var modelId    = data.fp.substr(1+data.fp.indexOf('_'));
            /*
            console.log({
                class:modelClass,
                id:modelId,
            });
            //*/
            
            var collection = window.collections[(new window[modelClass]()).table];
            
            // do we have a fresh cache in the collections?
            if (collection && collection.find(modelId))
            {
                resolve(collection.find(modelId));
                
                return;
            }
            
            // do we have a local copy in the DOM //deprecated
            if (data.json && data.json.id)
            {
                resolve(new window[modelClass](data.json));
                
                return;
            }
            
            // can we AJAX for it?
            if (modelId)
            {
                findModel(modelClass,modelId)
                    .then(resolve,reject);
                
                return;
            }
        }
        reject(null);
    });
 };
