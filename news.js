// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

// Centralized storage functions with error handling
const store = (key, data) => {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error storing ${key}:, error');
    }
};

const load = (key, defaultValue = []) => {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : defaultValue;
    } catch (error) {
        console.error('Error loading ${key}:, error');
        return defaultValue;
    }
};

// Dark Mode Setup
const initDarkMode = () => {
    const isDarkMode = load('darkMode', false);
    darkModeToggle.checked = isDarkMode;
    body.classList.toggle('dark-mode', isDarkMode);
    
    darkModeToggle.addEventListener('change', () => {
        const isChecked = darkModeToggle.checked;
        body.classList.toggle('dark-mode', isChecked);
        store('darkMode', isChecked);
    });
};

// Form handling with validation
const createFormHandler = (formId, fields, storageKey, displayFn) => {
    const form = document.getElementById(formId);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const values = {};
        let isValid = true;
        
        fields.forEach(field => {
            const value = document.getElementById(field.id).value.trim();
            values[field.name] = value;
            if (!value) isValid = false;
        });

        if (!isValid) return alert('Please fill in all fields');

        const items = load(storageKey);
        items.push(values);
        store(storageKey, items);

        fields.forEach(field => {
            document.getElementById(field.id).value = '';
        });
        
        displayFn();
        if (storageKey === 'events') displayCalendar(); // Update calendar for events
    });
};

// Display items with delete functionality
const createDisplayFn = (listId, storageKey, templateFn) => {
    return () => {
        const list = document.getElementById(listId);
        const items = load(storageKey);
        
        list.innerHTML = items.map((item, index) => `
            <div class="${listId}-item">
                ${templateFn(item)}
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `).join('');

        list.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.dataset.index);
                const updatedItems = load(storageKey).filter((_, i) => i !== index);
                store(storageKey, updatedItems);
                displayFn();
                if (storageKey === 'events') displayCalendar(); // Update calendar
            });
        });
    };
};

// News specific
const displayNews = createDisplayFn(
    'news-list',
    'news',
    (item) => `
        <h3>${item.title}</h3>
        <p>${item.content}</p>
    `
);

// Events specific
const displayEvents = createDisplayFn(
    'events-list',
    'events',
    (item) => `
        <h3>${item.title}</h3>
        <p>${item.date}</p>
    `
);

// Calendar Display with Month and Year Selection
let currentYear = new Date().getFullYear();
let currentMonth = new Date().getMonth();

const displayCalendar = () => {
    const calendar = document.getElementById('event-calendar');
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');
    const events = load('events');
    
    // Populate month dropdown
    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    monthSelect.innerHTML = months.map((month, index) => `
        <option value="${index}" ${index === currentMonth ? 'selected' : ''}>${month}</option>
    `).join('');

    // Populate year dropdown (current year ± 10 years)
    const startYear = currentYear - 10;
    const endYear = currentYear + 10;
    yearSelect.innerHTML = Array.from({ length: endYear - startYear + 1 }, (_, i) => startYear + i)
        .map(year => `
            <option value="${year}" ${year === currentYear ? 'selected' : ''}>${year}</option>
        `).join('');

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    // Filter events for the current month and year
    const eventsInMonth = events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.getMonth() === currentMonth && eventDate.getFullYear() === currentYear;
    });

    // Group events by date
    const eventsByDate = eventsInMonth.reduce((acc, event) => {
        const date = new Date(event.date).getDate();
        acc[date] = acc[date] || [];
        acc[date].push(event.title);
        return acc;
    }, {});

    let calendarHTML = `
        <div class="calendar-header">
            <h2>${months[currentMonth]} ${currentYear}</h2>
        </div>
        <div class="calendar-grid">
            <div class="day">Sun</div>
            <div class="day">Mon</div>
            <div class="day">Tue</div>
            <div class="day">Wed</div>
            <div class="day">Thu</div>
            <div class="day">Fri</div>
            <div class="day">Sat</div>
    `;

    // Add empty cells before first day
    for (let i = 0; i < startingDay; i++) {
        calendarHTML += '<div class="empty"></div>';
    }

    // Add days with events
    for (let day = 1; day <= daysInMonth; day++) {
        const eventsToday = eventsByDate[day] || [];
        calendarHTML += `
            <div class="day${eventsToday.length ? ' has-events' : ''}">
                <span class="day-number">${day}</span>
                ${eventsToday.map(title => `
                    <div class="event">${title}</div>
                `).join('')}
            </div>
        `;
    }

    calendarHTML += '</div>';
    calendar.innerHTML = calendarHTML;
};

// Initialize
const init = () => {
    initDarkMode();
    
    createFormHandler('news-form', [
        { id: 'news-title', name: 'title' },
        { id: 'news-content', name: 'content' }
    ], 'news', displayNews);

    createFormHandler('event-form', [
        { id: 'event-date', name: 'date' },
        { id: 'event-title', name: 'title' }
    ], 'events', displayEvents);

    // Month and Year selection handlers
    const monthSelect = document.getElementById('month-select');
    const yearSelect = document.getElementById('year-select');

    monthSelect.addEventListener('change', () => {
        currentMonth = parseInt(monthSelect.value);
        displayCalendar();
    });

    yearSelect.addEventListener('change', () => {
        currentYear = parseInt(yearSelect.value);
        displayCalendar();
    });

    displayNews();
    displayEvents();
    displayCalendar();
};

document.addEventListener('DOMContentLoaded', init);