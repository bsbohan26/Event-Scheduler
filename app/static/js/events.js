// Events Management Module
const EventManager = {
    events: JSON.parse(localStorage.getItem('events')) || [],
    gapiLoaded: false,

    init() {
        this.setupEventListeners();
        this.loadGoogleAPI();
        this.updateEventsList();
    },

    loadGoogleAPI() {
        const script = document.createElement('script');
        script.src = 'https://apis.google.com/js/api.js';
        script.onload = () => {
            gapi.load('client:auth2', () => {
                gapi.client.init({
                    apiKey: 'YOUR_API_KEY',
                    clientId: 'YOUR_CLIENT_ID',
                    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
                    scope: 'https://www.googleapis.com/auth/calendar.events'
                }).then(() => {
                    this.gapiLoaded = true;
                });
            });
        };
        document.body.appendChild(script);
    },

    setupEventListeners() {
        document.getElementById('addEventForm').addEventListener('submit', (e) => this.addEvent(e));
    },

    updateEventsList() {
        const eventsContainer = document.getElementById('eventsContainer');
        eventsContainer.innerHTML = '';

        if (this.events.length === 0) {
            eventsContainer.innerHTML = '<div class="text-center">No events scheduled yet</div>';
            return;
        }

        this.events.forEach((event, index) => {
            const eventCard = document.createElement('div');
            eventCard.className = 'card mb-3 event-card';
            eventCard.innerHTML = `
                <div class="card-body">
                    <h5 class="card-title">${event.title}</h5>
                    <p class="card-text">
                        <strong>Date:</strong> ${new Date(event.date).toLocaleDateString()}<br>
                        <strong>Time:</strong> ${event.time}<br>
                        <strong>Location:</strong> ${event.location}<br>
                        <strong>Description:</strong> ${event.description}
                    </p>
                    <span class="event-status status-${event.status.toLowerCase()}">${event.status}</span>
                    <div class="mt-3">
                        <button class="btn btn-sm btn-primary" onclick="EventManager.sendCalendarInvite(${index})">Send Calendar Invite</button>
                        <button class="btn btn-sm btn-warning" onclick="EventManager.editEvent(${index})">Edit</button>
                        <button class="btn btn-sm btn-danger" onclick="EventManager.deleteEvent(${index})">Delete</button>
                    </div>
                </div>
            `;
            eventsContainer.appendChild(eventCard);
        });
    },

    async addEvent(event) {
        event.preventDefault();
        
        const newEvent = {
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value,
            description: document.getElementById('eventDescription').value,
            status: 'Scheduled'
        };

        this.events.push(newEvent);
        localStorage.setItem('events', JSON.stringify(this.events));
        
        document.getElementById('addEventForm').reset();
        bootstrap.Modal.getInstance(document.getElementById('addEventModal')).hide();
        
        this.updateEventsList();
    },

    async sendCalendarInvite(index) {
        if (!this.gapiLoaded) {
            alert('Google Calendar API is not loaded yet. Please try again in a moment.');
            return;
        }

        const event = this.events[index];
        const calendarEvent = {
            'summary': event.title,
            'location': event.location,
            'description': event.description,
            'start': {
                'dateTime': `${event.date}T${event.time}:00`,
                'timeZone': 'America/New_York'
            },
            'end': {
                'dateTime': `${event.date}T${event.time}:00`,
                'timeZone': 'America/New_York'
            },
            'attendees': [
                {'email': 'attendee@example.com'} // This would be dynamic in a real app
            ],
            'reminders': {
                'useDefault': false,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10}
                ]
            }
        };

        try {
            const response = await gapi.client.calendar.events.insert({
                'calendarId': 'primary',
                'resource': calendarEvent
            });
            alert('Calendar invite sent successfully!');
        } catch (error) {
            console.error('Error sending calendar invite:', error);
            alert('Failed to send calendar invite. Please try again.');
        }
    },

    deleteEvent(index) {
        if (confirm('Are you sure you want to delete this event?')) {
            this.events.splice(index, 1);
            localStorage.setItem('events', JSON.stringify(this.events));
            this.updateEventsList();
        }
    },

    editEvent(index) {
        alert('Edit functionality will be implemented later');
    }
};

// Initialize when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => EventManager.init()); 