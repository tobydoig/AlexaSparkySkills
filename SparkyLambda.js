var termDates = [
    //  these are 2017/2018 for a Kent primary
    {start: new Date('4 sep 2017'), end: new Date('20 oct 2017')},
    {start: new Date('30 oct 2017'), end: new Date('20 dec 2017')},
    {start: new Date('4 jan 2018'), end: new Date('9 feb 2018')},
    {start: new Date('19 feb 2018'), end: new Date('29 mar 2018')},
    {start: new Date('16 apr 2018'), end: new Date('25 may 2018')},
    {start: new Date('4 jun 2018'), end: new Date('24 jul 2018')}
];
var specials = [
    //  some 2017/2018 holidays and inset days for a Kent primary
    new Date('4 sep 2017'),
    new Date('20 oct 2017'),
    new Date('19 feb 2018'),
    new Date('30 mar 2018'),
    new Date('7 may 2018'),
    new Date('23 jul 2018'),
    new Date('24 jul 2018')
];

function matchesDMY(date1, date2) {
    return date1.getFullYear() == date2.getFullYear() &&
        date1.getMonth() == date2.getMonth() &&
        date1.getDate() == date2.getDate();
}

function between(date, start, end) {
    var ms = date.getTime();
    return ms >= start.getTime() && ms <= end.getTime();
}

exports.handler = (event, context, callback) => {
    console.log('start of handler');
    
    var msg = "";
    var datefield = event.request.intent.slots.Date;
    
    if (!datefield.hasOwnProperty('value') || datefield.value !== "") {
        var when = event.request.intent.slots.Date.value ? new Date(event.request.intent.slots.Date.value) : new Date();
        var istoday = matchesDMY(when, new Date());
        var day = when.getDay();
    
        if (day > 0 && day < 6) {
            if (termDates.some((entry) => { return between(when, entry.start, entry.end); })) {
                if (specials.some((date) => { return matchesDMY(when, date); })) {
                    msg = "No, " + (istoday ? "today is" : "it will be") + " either an inset day or a public holiday";
                } else {
                    msg = "Yes, " + (istoday ? "today is" : "it will be") + " a school day";
                }
            } else {
                if (istoday) {
                    msg = "No, term hasn't started yet"
                } else {
                    msg = "No, it's not during term time"
                }
            }
        } else {
            msg = "No, it " + (istoday ? "is" : "will be") + " the weekend";
        }
    } else {
        msg = "I didn't understand which day you meant"
    }
    
    console.log('msg = ' + msg);
    
    var resp = {
        version: "1.0",
        response: {
            outputSpeech: {
                text: msg,
                type: "PlainText"
            },
            shouldEndSession: true
        }
    };
    
    context.succeed(resp);
};

