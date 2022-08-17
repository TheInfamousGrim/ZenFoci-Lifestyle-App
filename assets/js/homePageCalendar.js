
const eventInfoHomepageModal = document.querySelector('#event-info-home-modal');

/* --------------------------- materialize plugins -------------------------- */

// Event info modal instance
const eventInfoDayInstance = M.Modal.getInstance(eventInfoHomepageModal);
console.log(eventInfoDayInstance);

/* -------------------------------------------------------------------------- */
/*                              get saved events                              */
/* -------------------------------------------------------------------------- */

// get all events
function getUserEvents() {
    const savedEvents = JSON.parse(localStorage.getItem('userEvents')) || [];
    return savedEvents;
}

/* -------------------------------------------------------------------------- */
/*                         full calendar main calendar                        */
/* -------------------------------------------------------------------------- */

const dayViewCalendarEl = document.getElementById('calendar-day-view-content');
console.log(dayViewCalendarEl);
const dayViewCalendar = new FullCalendar.Calendar(dayViewCalendarEl, {
    // Set the initial view depending on the window width
    initialView: $(window).width() < 678 ? 'timeGridDay' : 'timeGridWeek',
    // Set the initial height depending on the window width
    height: $(window).width() < 678 ? 'auto' : 650,
    // Theme system for icons
    themeSystem: 'bootstrap',
    nowIndicator: true,
    // Set up for add event button
    customButtons: {
        dayCalendarButton: {
            hint: 'view the calendar by the selected day',
            click() {
                dayViewCalendar.changeView('timeGridDay');
            },
        },
        weekCalendarButton: {
            hint: 'view the calendar by the selected week',
            click() {
                dayViewCalendar.changeView('timeGridWeek');
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
            dayViewCalendar.changeView('timeGridDay');
            dayViewCalendar.setOption('height', 'auto');
            dayViewCalendar.setOption('headerToolbar', {
                start: 'prev',
                center: 'title',
                end: 'next',
            });
        } else {
            dayViewCalendar.changeView('timeGridWeek');
            dayViewCalendar.setOption('height', 650);
            dayViewCalendar.setOption('headerToolbar', {
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
    eventClick: (e) => {
        // inject event info into modal
        const eventInfoHomeName = $('#event-info-home-name');
        eventInfoHomeName.text(e.event._def.title);

        const eventInfoHomeDescription = $('#event-info-home-description');
        eventInfoHomeDescription.text(e.event._def.extendedProps.description);

        const eventInfoHomeType = $('#event-info-home-type');
        eventInfoHomeType.text(e.event._def.extendedProps.eventType);

        // give the modal a data attribute of the public id
        eventInfoHomepageModal.setAttribute('data-event-id', e.event._def.publicId);
        console.log(eventInfoHomepageModal.setAttribute('data-event-id', e.event._def.publicId));
        // open the modal
        eventInfoDayInstance.open();
    },
    events: getUserEvents(),
});

// Renders the calendar to the screen
dayViewCalendar.render();
// Updates the size to fit in the container
dayViewCalendar.updateSize();