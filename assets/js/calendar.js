/* -------------------------------------------------------------------------- */
/*                               add event modal                              */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                         full calendar main calendar                        */
/* -------------------------------------------------------------------------- */

const calendarEl = document.getElementById('calendar');
const calendar = new FullCalendar.Calendar(calendarEl, {
    // Set the initial for depending on the window width
    initialView: $(window).width() < 678 ? 'timeGridDay' : 'timeGridWeek',
    height: $(window).width() < 678 ? 'auto' : 650,
    // Theme system for icons
    themeSystem: 'bootstrap',
    // Set up for add event button
    customButtons: {
        newEventButton: {
            hint: 'add a new event to the calendar',
            click() {
                /* ---------------- CHANGE!!!! THIS IS JUST A PLACEHOLDER!!! ---------------- */
                alert('clicked the custom button!');
            },
        },
        dayCalendarButton: {
            hint: 'view the calendar by the selected day',
            click() {
                alert('day calendar has been clicked');
            },
        },
        weekCalendarButton: {
            hint: 'view the calendar by the selected week',
            click() {
                alert('week calendar has been clicked');
            },
        },
    },
    // Set up for button icons
    bootstrapFontAwesome: {
        newEventButton: 'fa-solid fa-calendar-circle-plus',
        dayCalendarButton: 'fa-solid fa-calendar-day',
        weekCalendarButton: 'fa-solid fa-calendar-week',
    },
    // Change the view and toolbar depending on window width being resized
    windowResize: () => {
        if ($(window).width() < 678) {
            calendar.changeView('timeGridDay');
            calendar.setOption('height', 'auto');
            calendar.setOption('headerToolbar', {
                start: 'prev',
                center: 'title',
                end: 'next',
            });
        } else {
            calendar.changeView('timeGridWeek');
            calendar.setOption('height', 650);
            calendar.setOption('headerToolbar', {
                start: 'newEventButton',
                center: 'title',
                end: 'dayCalendarButton weekCalendarButton prev today next',
            });
        }
    },
    // initialize selectable trait
    selectable: true,
    // Initializes what's in the header of the calendar depending on screen width
    headerToolbar:
        $(window).width() < 678
            ? {
                  start: 'prev',
                  center: 'title',
                  end: 'next',
              }
            : {
                  start: 'newEventButton',
                  center: 'title',
                  end: 'dayCalendarButton weekCalendarButton prev today next',
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
            // go to the date selected on the full calendar
            calendar.gotoDate(dates[0]);
        },
    },
});
calendarMini.init();
