
class AlertBag extends MessageBag
{
    parseKeyToAlertClass(key)
    {
        return {
          'info':     'alert-info',
          'error':    'alert-danger',
          'errors':   'alert-danger',
          'danger':   'alert-info',
          'debug':    'alert-info',
          'success':  'alert-success',
          'warning':  'alert-warning',
          'warnings': 'alert-warning',
        }[key]||'alert-info';
    }
    parseKeyToAlertFontAwesomeIconClass(key)
    {
        return {
          'info':     'fa-info-circle',
          'error':    'fa-times',
          'errors':   'fa-times',
          'danger':   'fa-info-circle',
          'debug':    'fa-wrench',
          'success':  'fa-check',
          'warning':  'fa-warning',
          'warnings': 'fa-warning',
        }[key]||'alert-info';
    }
    toUL()
    {
        const self = this;
        return '<div class="alertbag-to-ul">'+Object.keys(self.m)
            .reduce(function(carry, key)
            {
                if (self.m[key])
                {
                    const iconClass = self.parseKeyToAlertFontAwesomeIconClass(key);
                    const html = '<div class="alert '+self.parseKeyToAlertClass(key)+'">'
                        +'<ul class="fa-ul">'
                          +'<li><i class="fa fa-li '+iconClass+'"></i>&nbsp;'
                            +self.m[key].join('</li><li><i class="fa fa-li '+iconClass+'"></i>&nbsp;')
                          +'</li>'
                        +'</ul>'
                      +'</div>'
                    ;
                    carry.push(html);
                }

                return carry;
            },[])
            .join('')+'</div>';
    }
}
