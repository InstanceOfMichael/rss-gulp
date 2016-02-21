var default_datetimepicker = {  // this is jquery.ui.datepicker (and extended on top of that)
	//minDate: 0,	//today is the first day you are allowed to select
	changeMonth: true,
	changeYear: true,
	dateFormat: "DD, d MM, yy 'at'",
	timeFormat: "hh:mm:00",
	altFormat: "yy-mm-dd",
	altTimeFormat: "HH:mm:00",
	altField: "input[name='always overwrite this value -- severus snape']",
	altFieldTimeOnly: false,
	timezoneList: [{"value":"-300","label":"Eastern (GMT -5)"},{"value":"-360","label":"Central (GMT -6)"},{"value":"-420","label":"Mountain (GMT -7)"},{"value":"-480","label":"Pacific (GMT -8)"}],
	showTimezone: true,
	alwaysSetTime: true,
};

var countDownDefaults = {
    //expiryUrl: window.location.href,
};

if(typeof timezone_offset!=='undefined')
{
    countDownDefaults.timezone = timezone_offset;
}

var setUpCountDownTimer = function() {
    var options = $.extend(countDownDefaults,{
        until : $(this).find('input').val(),
    });
    //console.log(options);
    $(this).countdown(options);
};

var initCountdown = function () {

    //	http://keith-wood.name/countdown.html#quick
    $('span.countdown').each(setUpCountDownTimer);
};

/**
 * @link http://blogs.msmvps.com/theproblemsolver/2013/10/15/displaying-local-times-using-the-html5-lt-time-gt-element-and-moment-js/
 */
var renderDateTimeOnElement = function () {
   var el = $(this);
   var dt = moment(el.attr("datetime"));
   el.text(dt.format(el.data("format")));
};
var renderDateTimeOnTitle = function () {
   var el = $(this);
   var dt = moment(el.attr("datetime"));
   el.attr('title',dt.format(el.data("dt-title-format")));
};

var renderDateTimeDOM = function ($parent) {

  $parent = $parent||$('body');

  $parent.find("time[data-format]").each(renderDateTimeOnElement);
  $parent.find("[data-dt-title-format]").each(renderDateTimeOnTitle);
};

$(function(){
    // Turn all the date time pickers on if any exist
    if ($('.datetimepicker').length > 0)
    {
        $('.datetimepicker').datetimepicker();
    }

    // initialize all countdown timers
    initCountdown();

    // render all <time datetime="{{ $datetime->toIso8601String() }}" data-format="hh:mm A"> elements
    renderDateTimeDOM();
});

var makeLivestampHtml = function(/* momentJS */ time)
{
    $time = $('<span class="diff-for-humans" data-dt-title-format="M/D/YYYY hh:mm a">')
        .attr('data-livestamp',time.unix())
        .attr('title',time.format('M/D/YYYY hh:mm a'))
        .attr('datetime',time.format(/* ISO 8601 */))
        .text(time.fromNow())
        ;

    return $time;
        //<span class="diff-for-humans"
        //title="10/26/2015 06:39:31 pm"
        //datetime="2015-10-26T18:39:31+0000"
        //data-dt-title-format="M/D/YYYY hh:mm a"
        //data-livestamp="1445884771"
        //>2 days ago</span>
};
