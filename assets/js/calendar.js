/* -------------------------------------------------------------------------- */
/*                               add event modal                              */
/* -------------------------------------------------------------------------- */

// When I select a day on the mini calendar
// I'll select the same day on the full calendar

let dateSelected = dayjs().format('YYYY-MM-DD');

/* -------------------------------------------------------------------------- */
/*                      vanilla javascript mini calendar                      */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const calendarMini = new VanillaCalendar('.vanilla-calendar', {
        actions: {
            clickDay(e, dates) {
                dateSelected = dates[0];
            },
        },
    });
    calendarMini.init();
});

/* -------------------------------------------------------------------------- */
/*                         full calendar main calendar                        */
/* -------------------------------------------------------------------------- */

document.addEventListener('DOMContentLoaded', () => {
    const calendarEl = document.getElementById('calendar');
    const calendar = new FullCalendar.Calendar(calendarEl, {
        initialView: 'timeGridWeek',
        height: 650,
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
    // go to the date specified in the mini calendar
});

// event types
// habits
// goals

// When I select a day on the full calendar
// The mini calendar updates as well
