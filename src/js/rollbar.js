var makeRollbarPayloadConfig = function(){
    var person = {};
    if (window.auth)
    {
        var leftPad = 'process.env.ROLLBAR_PUBLIC_INSTANCE_ID:';
        var user_id = window.auth.get('id',NaN);
        var user_id7 = user_id.toString().slice(-7);
        person = $.extend(person,(window.auth.attr||{}),{
            user_id: user_id,
            id:      leftPad + user_id7,
        });
    }
    else
    {
        person.guest = 1;
    }
    // console.info(person);

    return {
        rollbar_person:person,
        environment:'process.env.APP_ENV',
    };
};
var _rollbarConfig = {
  accessToken: 'process.env.ROLLBAR_ACCESS_TOKEN_JS',
  captureUncaught: true,
};
// legacy support until rollbar's status transcends experimental
var ReportError = function (msg, url, line) {
    Rollbar.error('deprecated call to ReportError',{
        msg:msg,
        url:url,
        line:line,
    });
};
