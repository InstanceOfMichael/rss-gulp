/**
 *  something more specific can be attached to
 *       $(window).on('resize',resizeEndFacadeHandler);
 *  in place of window AT YOUR OWN PERIL
 *  if you need something more specialized.
 */
var resizeEndFacadeHandler = function(){
    // this code RAPID FIRES and is not safe to add more code
    // use $(whatever).on('resizeEnd',fn); instead
    if (this.resizeTO)
    {
        clearTimeout(this.resizeTO);
    }
    this.resizeTO = setTimeout(function()
    {
        $(this).trigger('resizeEnd');
    }, 350);
};
$(window)
  .on('resize',resizeEndFacadeHandler)
  .on('resizeEnd', function() {
      //do something, window hasn't changed size in 350ms
      $('#notify-list-container').css({'max-height':parseInt(0.85*$(window).height() - 100)+'px'});
  })
;
$(function(){
    $(window).trigger('resizeEnd');
});
