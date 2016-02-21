/*
 *	Alert JS class
 *
 */
Alert = {
	keys: {
		error:   {alert_class:'danger',  icon:'times'},
		warning: {alert_class:'warning', icon:'warning'},
		success: {alert_class:'success', icon:'check'},
		info:    {alert_class:'info',    icon:'info-circle'},
		debug:   {alert_class:'info',    icon:'wrench'}
	},
	keys_flat: [
		'error','warning','success','info','debug'
	],
	showAll:function (alerts,type)
	{
    if (isEmpty(alerts)||typeof alerts == 'function') return;

		if (typeof type === 'undefined')
		{
			for (var k in alerts)
			{
				if (!isEmpty(alerts[k]))
				{
					var nType = Alert.keys_flat.indexOf(k) !== -1 ? k : 'error' ;
					Alert.showAll(alerts[k],nType);
				}
			}
		}
		else // if (typeof alerts !=='function')
		{
      alerts.forEach(function(e,i,a){
        Alert.show({type:type,content:e});
      });
		}

		return true;
	},
	listAll:function (alerts,type)
	{
		var list = [];
		if (typeof type === 'undefined')
		{
			for (var k in alerts)
			{
				if (!isEmpty(alerts[k]))
				{
					var nType = Alert.keys_flat.indexOf(k) !== -1 ? k : 'error' ;

					var a = Alert.listAll(alerts[k],nType);
					list = list.concat(a);
				}
			}
			/*
			this.keys_flat.forEach(function(e,i,a){
				if (!isEmpty(alerts[e]))
				{
					// is that recursion? naaawh man!
					var a = Alert.listAll(alerts[e],e);
					list = list.concat(a);
				}
			});
			*/
		}
		else
		{
			alerts.forEach(function(e,i,a)
			{
				e = Alert.listItem({type:type,content:e});
				list.push(e);
			});
		}

		return list;
	},
	render:function(alert_class,icon,content)
	{
		$("<div />")
			.addClass('alert')
			.addClass('alert-'+alert_class)
			.addClass('alert-dismissable')
			.append(
				$("<button class=\"close\" />")
					.attr('type','button')
					.attr('data-dismiss','alert')
					.append('<i class="fa fa-times"></i>')
			)
			.append('<strong><i class="fa fa-'+icon+'"></i></strong>&nbsp;')
			.append(content)
			.append('<br />')
			.css({display:'none'})
			.appendTo('section.alerts')
			.slideDown();
	},
	renderListItem:function(alert_class,icon,content)
	{
		var $li = $("<div />")
			.addClass('alert')
			.addClass('alert-'+alert_class)
			/*
			.append(
				$("<button class=\"close\" />")
					//.addClasss('close')
					.attr('type','button')
					.attr('data-dismiss','alert')
					.append('<i class="fa fa-times"></i>')
			)
			*/
			.append('<strong><i class="fa fa-'+icon+'"></i></strong>&nbsp;')
			.append(content);

		$li = $("<div />").append($li).html();

		return $li;
	},
	listItem:function (o)
	{
		var content = o.content||'';
		if (!content.length)
		{
			return '';
		}
		var type		= o.type||'info';

		var alert_class = o.alert_class	||this.keys[type].alert_class	||'info';
		var icon		= o.icon		||this.keys[type].icon			||'info';

		var li = Alert.renderListItem(alert_class,icon,content);

		return li;
	},
	show:function (o)
	{
		var content = o.content||'';
		if (!content.length)
		{
			return false;
		}
		var type		= o.type||'info';

		var alert_class = o.alert_class	||this.keys[type].alert_class	||'info';
		var icon		= o.icon		||this.keys[type].icon			||'info';

		Alert.render(alert_class,icon,content);

		var focus = o.focus||'';
		if (focus.length)
		{
			$(focus).focus();
		}

		return true;
	},
	onlyString:function(o,str)
	{
		if (typeof o === 'string')
		{
			o = {content:o};
		}
		else
		{
			o = o||{};
		}
		if (typeof str !== 'undefined')
		{
			o.type = str;
		}
		return o;
	},
	error:function(o)
	{
		o = this.onlyString(o,'error');
		return this.show(o);
	},
	warning:function(o)
	{
		o = this.onlyString(o,'warning');
		return this.show(o);
	},
	success:function(o)
	{
		o = this.onlyString(o,'success');
		return this.show(o);
	},
	info:function(o)
	{
		o = this.onlyString(o,'info');
		return this.show(o);
	},
	debug:function(o)
	{
		o = this.onlyString(o,'debug');
		return this.show(o);
	}
};
/*	//enable these lines to test Alert!
$(document).ready(function(){

	Alert.show({content:'sklfjlksdjfsd'});
	Alert.show({content:'ERROR!',type:'error'});
	Alert.debug({content:'debug example!'});
	Alert.info('This Example Shows String-only input (not availble for raw Alert.show() )');
})
//*/
$(function(){
	try{Alert.showAll((alerts||[]));}catch(e){}
});
