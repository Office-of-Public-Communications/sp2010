/*
thisDirResults = this.data;
dirResultsTitles = this.data[0];
dirKeys = Object.keys(dirResultsTitles);
for (i = 0; i < 2; i++) {
    dirTitles = dirKeys[i];
    tHeaderRow = $("#headerRow");
    tFooterRow = $("#footerRow")
}
tHeaderRow.append($(
    '<th>Title</th><th>Park</th><th>Date</th>'
));*/

//Main Data
for (i = 0; i < thisDirResults.length; i++) {

    var createCard = function () {
        // build card here
        $("#rowItems")
            .append($('<tr>')
                .append('<td><a id="dirListTitleLink" href="../Pages/Event.aspx?=' +
                    dirItems.ID + '">' + dirItems.Title + '</a></td>')
                .append($('<td>' + (dirItems.Park != undefined ? dirItems.Park
                    .lookupValue :
                    ' ') + '</td>'))
                .append($('<td>' + date + '</td>'))
            );
    };

    dirItems = thisDirResults[i];
    //check if date is upcoming or past
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    // if event is recurring, get all the info sorted
    if ((dirItems.Recurring) && ((dirItems.EndDate >=
        today) || (dirItems.EndDate == undefined))) {

        if (dirItems.Recurring) {
            for (j = 0; j < dirItems.Recurring.length; j++) {
                // no end date or its in the future
                if (dirItems.EndDate >= today || !dirItems.EndDate) {

                    // variables
                    var whatDays = [];
                    var whatWeeks = [];
                    var everyday = false;
                    var startDate = dirItems.Date;
                    var endDate = dirItems.EndDate;
                    var upcoming;

                    if (dirItems.Recurring[j].lookupValue == 'Every Monday') {
                        whatDays.push('Monday');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every First Monday') {
                        whatDays.push('Monday');
                        whatWeeks.push('0');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Second Monday') {
                        whatDays.push('Monday');
                        whatWeeks.push('1');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Third Monday') {
                        whatDays.push('Monday');
                        whatWeeks.push('2');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Fourth Monday') {
                        whatDays.push('Monday');
                        whatWeeks.push('3');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Tuesday') {
                        whatDays.push('Tuesday');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every First Tuesday') {
                        whatDays.push('Tuesday');
                        whatWeeks.push('0');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Second Tuesday') {
                        whatDays.push('Tuesday');
                        whatWeeks.push('1');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Third Tuesday') {
                        whatDays.push('Tuesday');
                        whatWeeks.push('2');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Fourth Tuesday') {
                        whatDays.push('Tuesday');
                        whatWeeks.push('3');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Wednesday') {
                        whatDays.push('Wednesday');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every First Wednesday') {
                        whatDays.push('Wednesday');
                        whatWeeks.push('0');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Second Wednesday') {
                        whatDays.push('Wednesday');
                        whatWeeks.push('1');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Third Wednesday') {
                        whatDays.push('Wednesday');
                        whatWeeks.push('2');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Fourth Wednesday') {
                        whatDays.push('Wednesday');
                        whatWeeks.push('3');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Thursday') {
                        whatDays.push('Thursday');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every First Thursday') {
                        whatDays.push('Thursday');
                        whatWeeks.push('1');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Second Thursday') {
                        whatDays.push('Thursday');
                        whatWeeks.push('2');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Third Thursday') {
                        whatDays.push('Thursday');
                        whatWeeks.push('3');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Fourth Thursday') {
                        whatDays.push('Thursday');
                        whatWeeks.push('3');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Friday') {
                        whatDays.push('Friday');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every First Friday') {
                        whatDays.push('Friday');
                        whatWeeks.push('0');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Second Friday') {
                        whatDays.push('Friday');
                        whatWeeks.push('1');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Third Friday') {
                        whatDays.push('Friday');
                        whatWeeks.push('2');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Fourth Friday') {
                        whatDays.push('Friday');
                        whatWeeks.push('3');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Saturday') {
                        whatDays.push('Saturday');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every First Saturday') {
                        whatDays.push('Saturday');
                        whatWeeks.push('0');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Second Saturday') {
                        whatDays.push('Saturday');
                        whatWeeks.push('1');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Third Saturday') {
                        whatDays.push('Saturday');
                        whatWeeks.push('2');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Fourth Saturday') {
                        whatDays.push('Saturday');
                        whatWeeks.push('3');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Sunday') {
                        whatDays.push('Sunday');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every First Sunday') {
                        whatDays.push('Sunday');
                        whatWeeks.push('0');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Second Sunday') {
                        whatDays.push('Sunday');
                        whatWeeks.push('1');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Third Sunday') {
                        whatDays.push('Sunday');
                        whatWeeks.push('2');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Every Fourth Sunday') {
                        whatDays.push('Sunday');
                        whatWeeks.push('3');
                    }
                    if (dirItems.Recurring[j].lookupValue == 'Everyday') {
                        everyday = true;
                    }

                    if (everyday === true) {
                        //console.log('it true')
                        var upcoming = moment(startDate).recur(endDate ? endDate :
                            false).every(1).day();
                        upcoming.fromDate(startDate);
                        upcoming.endDate(endDate);
                        upcomingDates = upcoming.all('LL');
                        //console.log(upcomingDates)
                    }
                    // begins today or later and has an end date
                    if (startDate >= today && endDate != undefined) {
                        // has days but no weeks
                        if (whatDays.length > 0 && whatWeeks.length < 1) {
                            var upcoming = moment(startDate).recur(endDate ? endDate :
                                false).every(whatDays).daysOfWeek();
                            upcoming.fromDate(startDate);
                            upcoming.endDate(endDate);
                            upcomingDates = upcoming.all('LL');
                        }

                        // has days and weeks
                        if (whatDays.length > 0 && whatWeeks.length > 0) {
                            var upcoming = moment(startDate).recur(endDate ? endDate :
                                false).every(whatDays).daysOfWeek().every(whatWeeks)
                                .weeksOfMonthByDay();
                            upcoming.fromDate(startDate);
                            upcoming.endDate(endDate);
                            upcomingDates = upcoming.all('LL');
                        }
                    }
                    // began before today
                    if (startDate < today) {
                        // has days but no weeks
                        if (whatDays.length > 0 && whatWeeks.length < 1) {
                            var upcoming = moment(today).recur().every(whatDays)
                                .daysOfWeek();
                            upcomingDates = upcoming.next(10, 'LL');
                        }

                        // has days and weeks
                        if (whatDays.length > 0 && whatWeeks.length > 0) {
                            var upcoming = moment(today).recur().every(whatDays)
                                .daysOfWeek().every(whatWeeks).weeksOfMonthByDay();
                            upcomingDates = upcoming.next(10, 'LL');
                        }
                    }
                    // build 'em, baby!
                    for (k = 0; k < upcomingDates.length; k++) {
                        var date = upcomingDates[k];
                        //console.log(upcomingDates[k])
                        createCard();
                    }
                }
            }
        }
    }
}