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
// selector for the date picker input container
const dateInputPicker = $('.date-picker-input-container');
// selector for the date input label
const endDateInput = $('[name="end-date-input"]');
endDateInput.val('pepega');

// selector for the
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
    console.log('is the input not selected: ', e.target !== document.activeElement);
    // remove the date picker after the user has 
    console.log('Is the date picker not being focused on: ', !currentDatePicker.contains(e.target));
    if (!currentDatePicker.contains(e.target) && e.target !== document.activeElement) {
        currentDatePicker.classList.remove('date-picker-general-visible');
        currentDatePicker.classList.add('date-picker-general-hidden');
    }
}

dateInputPicker.on('click', handleDateInput);

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

const largeCalendarContainer = document.querySelector('.large-calendar-container');
