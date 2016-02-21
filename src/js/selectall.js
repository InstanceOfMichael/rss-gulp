$(function(){
	/**
	 * Select All
	 * 
	 *		things that select all
	 * <input type="checkbox" data-select-all="key-a" />
	 * <a href="#" data-select-all="key-a" data-select-state="1">Select All</a>
	 * <a href="#" data-select-all="key-a" data-select-state="0">Select None</a>
	 * 
	 *		things that will be "select-all"-ed
	 * <input type="checkbox" data-selectable="key-a" name="object_x" />
	 * <input type="checkbox" data-selectable="key-a" name="object_y" />
	 * <input type="checkbox" data-selectable="key-a" name="object_z" />
	 * 
	 * 		this code works on objects loaded via AJAX
	 * 		this code works with the enter-key
	 * 
	 * 	dont forget to .trigger('change') when appropriate
	 * 
	 * Bug:: having 2 select all checkboxes is broken, consider using a
	 *	an anchor instead
	 */
	$('body').on('click','a[data-select-all],button[data-select-all]',function(event){
		event&&event.preventDefault();
		
		//	i have no idea is this is a stupid or genius
		$(this).trigger('change');
	});
	$('body').on('change','*[data-select-all]',function(){
		var select = $(this).attr('data-select-all');
		var state = $(this).attr('data-select-state');
		if (typeof state === 'undefined')
		{
			state = $(this).prop('checked')?'1':'0';
		}
		state = (state == '1') ? true : false;
		if (select.length)
		{
			$('[data-selectable='+ select +']').each(function () {
				var f = $(this).attr('data-select-function')||false;
				if (f){
					console.warn("Feature Not Implemented");
				}
				else
				{
					$(this).prop('checked',state);
				}
			});
		}
		$('*[data-select-all]').prop('checked',state);
		return true;
	});
	$('body').on('change','input[data-selectable]',function(){
		var select = $(this).attr('data-selectable');
		{
			state = $(this).prop('checked');
		}
		if (select.length && state===false)
		{
			$('[data-select-all='+ select +']').each(function () {
				$(this).prop('checked',false);
			});
		}
		else if (select.length && state===true)
		{
			var a = true;
			$('[data-selectable='+ select +']').each(function () {
				if (!$(this).prop('checked'))
				{
					a = false;
					return false;
				}
			});
			if (a)
			{
				$('[data-select-all='+ select +']').each(function () {
					$(this).prop('checked',true);
				});
			}
		}
		return true;
	});
});
