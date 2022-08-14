/* -------------------------------------------------------------------------- */
/*                                   plugins                                  */
/* -------------------------------------------------------------------------- */

/* -------------------------------------------------------------------------- */
/*                         full calendar main calendar                        */
/* -------------------------------------------------------------------------- */

const calendarEl = document.getElementById('calendar');
const calendar = new FullCalendar.Calendar(calendarEl, {
    // Set the initial view depending on the window width
    initialView: $(window).width() < 678 ? 'timeGridDay' : 'timeGridWeek',
    // Set the initial height depending on the window width
    height: $(window).width() < 678 ? 'auto' : 650,
    // Theme system for icons
    themeSystem: 'bootstrap',
    nowIndicator: true,
    // Set up for add event button
    customButtons: {
        newEventButton: {
            hint: 'add a new event to the calendar',
            click() {
                window.location = '#new-event-modal';
                console.log('clicked new event');
            },
        },
        dayCalendarButton: {
            hint: 'view the calendar by the selected day',
            click() {
                calendar.changeView('timeGridDay');
            },
        },
        weekCalendarButton: {
            hint: 'view the calendar by the selected week',
            click() {
                calendar.changeView('timeGridWeek');
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
                start: 'title',
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
                  start: 'title',
                  end: 'dayCalendarButton weekCalendarButton prev today next',
              },
    events: [
        // General event
        {
            // this object will be "parsed" into an event object}
            id: 1, // increment by one for each event so it has a unique id
            title: 'Meet my friends',
            // This is the event type
            eventType: 'general',
            classList: 'events general-events',
            color: '#26a69a',
            allDay: true,
            start: '2022-08-16',
            // startTime: '10:00',
            end: '2022-08-16',
            // endTime: '11:00',
            // [sun, mon, tue, wed, thu, fri, sat]
            // [0  , 1  , 2  , 3  , 4  , 5  , 6  ]
            // If recurring the start or stop properties aren't needed
            description: 'Going to a tame impala gig at the O2 venue',
        },
    ],
});
// Renders the calendar to the screen
calendar.render();
// Updates the size to fit in the container
calendar.updateSize();

/* ------------------------ submit the calendar form ------------------------ */

console.log(dayjs.extend(utc));
console.log(dayjs.extend(timezone));

// event object constructor full calendar
const eventsObj = {
    events: [
        // General event
        {
            // this object will be "parsed" into an event object}
            id: 1, // increment by one for each event so it has a unique id
            title: 'Meet my friends',
            // This is the event type
            groupId: 'general',
            classList: 'events general-events',
            color: '#26a69a',
            allDay: false,
            start: '2022-08-16',
            startTime: '10:00',
            end: '2022-08-16',
            endTime: '11:00',
            // [sun, mon, tue, wed, thu, fri, sat]
            // [0  , 1  , 2  , 3  , 4  , 5  , 6  ]
            // If recurring the start or stop properties aren't needed
            daysOfWeek: [2],
            description: 'Going to a tame impala gig at the O2 venue',
        },
    ],
};

calendar.addEvent(eventsObj);

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

/* -------------------------------------------------------------------------- */
/*                               new event modal                              */
/* -------------------------------------------------------------------------- */

// Modal initializer
const elems = document.querySelectorAll('.modal');
const instances = M.Modal.init(elems, {
    startingTop: '0%',
    endingTop: '0%',
});

// Select initializer
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('select');
    const instances = M.FormSelect.init(elems, {
        dropdownOptions: {},
    });
});

// Dropdown initializer
document.addEventListener('DOMContentLoaded', () => {
    const elems = document.querySelectorAll('.dropdown-trigger');
    const instances = M.Dropdown.init(elems, {});
});

/* ------------------------------- date picker ------------------------------ */

// selector for the date picker
const datePickers = $('.date-picker-general');
// add a calendar for each date-picker div
$.each(datePickers, (key, datePicker) => {
    const datePickerCalendar = new VanillaCalendar(datePicker, {
        type: 'default',
        actions: {
            clickDay(e, dates) {
                if (dates) {
                    // Get the correct input
                    const currentDateInput =
                        e.target.parentElement.parentElement.parentElement.parentElement.parentElement
                            .firstElementChild;
                    // Format the date for the input
                    const formattedDateInput = dayjs(dates[0]).format('MMMM DD, YYYY');
                    // Add the formatted date to the selected input
                    currentDateInput.value = formattedDateInput;
                }
            },
        },
    });
    datePickerCalendar.init();
});

function handleDateInput(e) {
    // select the correct date picker div
    const currentDatePicker = e.currentTarget.lastElementChild;
    // display the selected date picker
    currentDatePicker.classList.remove('date-picker-general-hidden');
    // style the selected date picker
    currentDatePicker.classList.add('date-picker-general-visible');
    // remove the date picker after the user has selected a date
    if (!currentDatePicker.contains(e.target) && e.target !== document.activeElement) {
        currentDatePicker.classList.remove('date-picker-general-visible');
        currentDatePicker.classList.add('date-picker-general-hidden');
    }
}

// selector for the date picker input container
const dateInputPicker = $('.date-picker-input-container');
// event listeners for the date inputs
dateInputPicker.on('click', handleDateInput);
