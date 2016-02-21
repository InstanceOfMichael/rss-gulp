/**
 *  based on http://laravel.com/api/4.2/Illuminate/Database/Eloquent/Collection.html
 */
function Collection(d) {
  if (isEmpty(d)) d = [];
  this.data = d;
}
Collection.prototype.class = 'Collection';
Collection.prototype.all = function(){
  return this.data;
};
Collection.prototype.has = function(k){
  return !!this.get(k,0);
};
Collection.prototype.find = function(id,d){
  for(var x=0; x < this.data.length; x++)
  {
      if (this.data[x].get('id')==id) return this.data[x];
  }
  return d;
};
Collection.prototype.get = function(k,d){
  if (typeof this.data[k]!='undefined') return this.data[x];
  return d;
};
Collection.prototype.map = function(f){
  return this.constructor(this.data.map(f));
};
Collection.prototype.slice = function(a,b){
  return this.constructor(this.data.slice(a,b));
};
Collection.prototype.all = function(f){
  return this.data;
};
Collection.prototype.sort = function(f){
  return this.constructor(this.data.sort(f));
};
Collection.prototype.reverse = function(){
  return this.constructor(this.data.reverse());
};
Collection.prototype.first = function(f,d){
  if (!f || !d)
  {
      throw "Not Supported";
  }
  return this.data[0];
};
Collection.prototype.lists = function(k,i)
{
  if (!i)
  {
      return this.data.map(function(e){ return e.get(k); });
  }
  
  var a = {};
  
  for(var x=0; x < this.data.length; x++)
  {
      a[this.data[x].get(i)] = this.data[x].get(k);
  }
  return a;
};

function syncCollectionSoon(newModel)
{
    //console.warn({syncCollectionSoon:newModel,fp:newModel.fp()});
    setTimeout(function()
    {
        var collection = array_get(window,'collections.'+newModel.table);
        if (collection)
        {
            var model = collection.find(newModel.get('id'));
            
            if (model)
            {
                model.hydrate(newModel.attr);
                //return console.info('hydrated collection!');
            }
            //return console.error({'model not found :(':newModel.fp()});
        }
        //return console.error({'collection not found :(':newModel.fp()});
    },1);
}

