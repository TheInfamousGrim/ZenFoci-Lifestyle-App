/* -------------------------------------------------------------------------- */
/*                              general selectors                             */
/* -------------------------------------------------------------------------- */

const eventInfoModal = document.querySelector('#event-info-modal');

/* --------------------------- materialize plugins -------------------------- */

// Modal initializer

const elems = document.querySelectorAll('.modal');
const instances = M.Modal.init(elems, {
    startingTop: '0%',
    endingTop: '0%',
});

// Event info modal instance
const eventInfoInstance = M.Modal.getInstance(eventInfoModal);
console.log(eventInfoInstance);

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

/* -------------------------------------------------------------------------- */
/*                              get saved events                              */
/* -------------------------------------------------------------------------- */

// get all events
function getUserEvents() {
    const savedEvents = JSON.parse(localStorage.getItem('userEvents')) || [];
    return savedEvents;
}

/* -------------------------------------------------------------------------- */
/*                       delete event from local storage                      */
/* -------------------------------------------------------------------------- */

function deleteEvent(eventsToSave) {
    const allEvents = getUserEvents();
    localStorage.setItem('userEvents', JSON.stringify(eventsToSave));
}

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
    eventClick: (e) => {
        // inject event info into modal
        const eventInfoName = $('#event-info-name');
        eventInfoName.text(e.event._def.title);

        const eventInfoDescription = $('#event-info-description');
        eventInfoDescription.text(e.event._def.extendedProps.description);

        const eventInfoType = $('#event-info-type');
        eventInfoType.text(e.event._def.extendedProps.eventType);

        // give the modal a data attribute of the public id
        eventInfoModal.setAttribute('data-event-id', e.event._def.publicId);
        // open the modal
        eventInfoInstance.open();
    },
    events: getUserEvents(),
});

// Renders the calendar to the screen
calendar.render();
// Updates the size to fit in the container
calendar.updateSize();

/* ------------------------ submit the calendar form ------------------------ */

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
/*                              event info modal                              */
/* -------------------------------------------------------------------------- */

const deleteEventBtn = $('#delete-event-button');
// event handler for the delete button
function handleDeleteEvent(e) {
    // get the data-event-id
    const { eventId } = eventInfoModal.dataset;
    // get the full calendar event by id
    const fullCalendarEvent = calendar.getEventById(eventId);
    // remove the event from the calendar
    fullCalendarEvent.remove();

    // remove the event from the local storage
    // get the event from local storage
    const savedEvents = getUserEvents();
    console.log(savedEvents);
    // filter the saved events by using the current event id
    const filteredSavedEvents = savedEvents.filter((event) => event.id !== parseInt(eventId));
    // delete the event
    deleteEvent(filteredSavedEvents);

    // close the modal
    eventInfoInstance.close();
}

// event listener for the delete button
deleteEventBtn.on('click', handleDeleteEvent);

/* -------------------------------------------------------------------------- */
/*                               new event modal                              */
/* -------------------------------------------------------------------------- */

/* ----------------------------- form selectors ----------------------------- */
// event name input selector
const eventNameInput = $('#eventNameInput');
// event type input selector
const eventTypeSelection = $('.select-event-type');
// event start date selector
const startDateInput = $('#dateStartInput');
// event start time selector
const startTimeSelection = $('.select-start-time');
// event end date selector
const endDateInput = $('#dateEndInput');
// event end time selector
const endTimeSelection = $('.select-end-time');
// select time selections
const selectTimeSelections = document.querySelectorAll('.select-time');
// event all day checkbox selector
const allDayCheckbox = $('#allDayCheckbox');
// event recurring settings button selector
const repeatWhenBtn = $('.repeat-when-button');
// event description selector
const eventDescriptionInput = $('#event-description-textarea');
// add event button selector
const addEventBtn = $('.submit-event-button');

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

/* ---------------------------- all day checkbox ---------------------------- */

// all day checkbox event handler
// enables and disables start time and end time depending on whether all day has been checked
function handleAllDayCheckbox(e) {
    if (e.currentTarget.checked) {
        // disable the start time and end time
        selectTimeSelections.forEach((timeSelection) => {
            timeSelection.setAttribute('disabled', true);
            const disabledTimeInstance = M.FormSelect.init(timeSelection);
        });
    }
    if (!e.currentTarget.checked) {
        selectTimeSelections.forEach((timeSelection) => {
            timeSelection.removeAttribute('disabled');
            const enabledTimeInstance = M.FormSelect.init(timeSelection);
        });
    }
}

// all day checkbox event listener
allDayCheckbox.on('click', handleAllDayCheckbox);

/* --------------------------- repeat when button --------------------------- */

// repeat basic choices selector
const repeatBasicChoices = document.querySelectorAll('.repeat-basic-choices');

// event handler for the repeat basic choices
function handleRepeatBasicChoices(e) {
    // get the text for the choice selected
    const repeatChoiceText = e.currentTarget.innerText;
    // set the dirty HTML
    const dirtyRepeatBasicChoicesHTML = `<i class="fa-solid fa-repeat left"></i> ${repeatChoiceText}</a>`;
    // sanitize the dirty HTML
    const cleanRepeatBasicChoicesHTML = DOMPurify.sanitize(dirtyRepeatBasicChoicesHTML, {
        USE_PROFILE: { html: true },
    });
    repeatWhenBtn.html(cleanRepeatBasicChoicesHTML);
}

// event listener for the repeat basic choices
repeatBasicChoices.forEach((choice) => {
    choice.addEventListener('click', handleRepeatBasicChoices);
});
/* ---------------------- custom recurring event modal ---------------------- */

// get the modal instance
const recurringEventInstance = M.Modal.getInstance($('#custom-recurring-event'));
// days checkboxes selector
const daysChecked = document.querySelectorAll('.day-repeat-checks');
// recurring event submit button
const recurringEventSbtBtn = $('.submit-recurring-button');
// recurring event cancel button
const recurringEventCnclBtn = $('.cancel-recurring-button');

// handle function for the recurring event submit button
function handleRecurringSubmit(e) {
    // create an empty array for the repeat days
    const repeatDaysData = [];
    daysChecked.forEach((dayChecked) => {
        if (dayChecked.checked) {
            // get the checked days data and push it into the array
            repeatDaysData.push(dayChecked.dataset.dayNum);
        }
    });
    const dirtyRepeatWhenHTML = `<i class="fa-solid fa-repeat left"></i> Custom</a>`;
    const cleanRepeatWhenHTML = DOMPurify.sanitize(dirtyRepeatWhenHTML, { USE_PROFILE: { html: true } });
    repeatWhenBtn.html(cleanRepeatWhenHTML);
    recurringEventInstance.close();
}

// event listener for the recurring event submit button
recurringEventSbtBtn.on('click', handleRecurringSubmit);

// handle function for the recurring event cancel button
function handleRecurringCancel(e) {
    recurringEventInstance.close();
}

// event listener for the recurring event cancel button
recurringEventCnclBtn.on('click', handleRecurringCancel);

/* -------------------------------------------------------------------------- */
/*                   save events and render to the calendar                   */
/* -------------------------------------------------------------------------- */

// save the user event to the local storage
function saveEventToLocalStorage(formattedEvent) {
    const savedUserEvents = getUserEvents();
    console.log('saved events: ', savedUserEvents);
    console.log('formatted event: ', formattedEvent);
    const updatedSavedEvents = [...savedUserEvents, formattedEvent];
    console.log('updated saved events: ', updatedSavedEvents);
    localStorage.setItem('userEvents', JSON.stringify(updatedSavedEvents));
}

// format either to ISOString or Unix Timestamp milliseconds
function dateTimeFormatted(date, time) {
    if (date && !time) {
        const dateISOString = dayjs(date).toISOString();
        return dateISOString;
    }
    if (date && time) {
        const UnixTimestamp = dayjs(`${date} ${time}`).valueOf();
        return UnixTimestamp;
    }
}

// format the repeat day inputs for full calendar
function formatRepeatDays() {
    if (repeatWhenBtn.text().includes('Repeat') || repeatWhenBtn.text().includes('Does not repeat')) {
        return null;
    }
    if (repeatWhenBtn.text().includes('Every day')) {
        const everyDayArray = [0, 1, 2, 3, 4, 5, 6];
        return everyDayArray;
    }
    if (repeatWhenBtn.text().includes('Custom')) {
        const repeatDaysData = [];
        daysChecked.forEach((dayChecked) => {
            if (dayChecked.checked) {
                // get the checked days data and push it into the array
                repeatDaysData.push(dayChecked.dataset.dayNum);
            }
        });
        return repeatDaysData;
    }
}

// all day event formatter
function allDayFormatter(userEventInputs) {
    // remove the time inputs from the object
    const { startTime, endTime, ...userAllDayInputs } = userEventInputs;
    // reformat the start and end dates
    const allDayEventsFormatted = {
        ...userAllDayInputs,
        start: dateTimeFormatted(startDateInput.val()),
        end: dateTimeFormatted(endDateInput.val()),
    };
    return allDayEventsFormatted;
}
// no repeat event formatter
function noRepeatFormatter(userEventInputs) {
    // remove all repeat and allDay properties
    const { daysOfWeek, allDay, startTime, endTime, ...noRepeatEvents } = userEventInputs;
    return noRepeatEvents;
}

// no repeat all day formatter
function noRepeatAllDayFormatter(userEventInputs) {
    // remove all repeat properties
    const { daysOfWeek, startTime, endTime, ...noRepeatAllDay } = userEventInputs;
    return noRepeatAllDay;
}

// bounded custom formatter
function boundedCustomRepeatFormatter(userEventInputs) {
    const { allDay, ...boundedCustomInputs } = userEventInputs;
    const boundedCustomEvents = {
        ...boundedCustomInputs,
        start: dateTimeFormatted(startDateInput.val()),
        end: dateTimeFormatted(endDateInput.val()),
    };
    return boundedCustomEvents;
}

// handle add event function
function handleAddEvent(e) {
    e.preventDefault();

    // get the saved events
    const savedEvents = getUserEvents();

    // increment the id by finding the length of the array of data
    const eventId = savedEvents.length + 1;

    // grab the inputs and store them in an object
    const userEventInputs = {
        id: eventId,
        title: `${eventNameInput.val()}`,
        eventType: `${eventTypeSelection.val()}`,
        classList: `events ${eventTypeSelection.val()}-events`,
        start: dateTimeFormatted(startDateInput.val(), startTimeSelection.val()),
        startTime: `${startTimeSelection.val()}`,
        end: dateTimeFormatted(startDateInput.val(), endTimeSelection.val()),
        endTime: `${endTimeSelection.val()}`,
        allDay: `${allDayCheckbox.is(':checked')}`,
        daysOfWeek: formatRepeatDays(),
        description: `${eventDescriptionInput.val()}`,
    };

    // if the title, type, start date and end date aren't selected
    // return
    // if all day and no repeat are checked
    if (allDayCheckbox.is(':checked') && userEventInputs.daysOfWeek === null) {
        const allDayNoRepeatEvent = noRepeatAllDayFormatter(userEventInputs);
        // render event to full calendar
        calendar.addEvent(allDayNoRepeatEvent);
        // save event to the local storage
        saveEventToLocalStorage(allDayNoRepeatEvent);
        return;
    }
    // if all day is checked
    if (allDayCheckbox.is(':checked')) {
        const allDayEvent = allDayFormatter(userEventInputs);
        // render event to full calendar
        calendar.addEvent(allDayEvent);
        // save to the local storage
        saveEventToLocalStorage(allDayEvent);
        return;
    }
    // if the event isn't repeated
    if (userEventInputs.daysOfWeek === null) {
        const noRepeatEvent = noRepeatFormatter(userEventInputs);
        // render event to full calendar
        calendar.addEvent(noRepeatEvent);
        // save event to the local storage
        saveEventToLocalStorage(noRepeatEvent);
    }

    // if the event isn't all day and there is a custom repeat
    if (!allDayCheckbox.is(':checked') && userEventInputs.daysOfWeek !== null) {
        const boundedCustomEvent = boundedCustomRepeatFormatter(userEventInputs);
        calendar.addEvent(boundedCustomEvent);
        console.log(boundedCustomEvent);
        saveEventToLocalStorage(boundedCustomEvent);
    }
}

// add an event listener to the add event button
addEventBtn.on('click', handleAddEvent);
