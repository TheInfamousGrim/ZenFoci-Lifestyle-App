/* -------------------------------------------------------------------------- */
/*                               add event modal                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                         full calendar main calendar                        */
/* -------------------------------------------------------------------------- */

const calendarEl = document.getElementById('calendar');
const calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'timeGridWeek',
    height: 650,
    windowResize: () => {
        if ($(window).width() < 678) {
            calendar.changeView('timeGridDay');
        } else calendar.changeView('timeGridWeek');
    },
    // initialize selectable trait
    selectable: true,
    // Set up for add event button
    customButtons: {
        newEventButton: {
            text: '+ add event',
            click() {
                alert('clicked the custom button!');
            },
        },
    },
    // Initializes what's in the header of the calendar
    headerToolbar: {
        start: 'newEventButton',
        center: 'title',
        end: 'prev today next',
    },
});
// Renders the calendar to the screen
calendar.render();
// Updates the size to fit in the container
calendar.updateSize();

// When I select a day on the full calendar
// The mini calendar updates as well

/* -------------------------------------------------------------------------- */
/*                      vanilla javascript mini calendar                      */
/* -------------------------------------------------------------------------- */

const calendarMini = new VanillaCalendar('.vanilla-calendar', {
    actions: {
        clickDay(e, dates) {
            // go to the date selected
            calendar.gotoDate(dates[0]);
        },
    },
});
calendarMini.init();
