const nav = document.getElementById('cityNav');
const indicator = document.getElementById('indicator');
const cityTimeDisplay = document.getElementById('cityTime');
let cities = [
    { "section": "cupertino", "label": "Cupertino", "timezone": "America/Los_Angeles" },
    { "section": "new-york-city", "label": "New York City", "timezone": "America/New_York" },
    { "section": "london", "label": "London", "timezone": "Europe/London" },
    { "section": "amsterdam", "label": "Amsterdam", "timezone": "Europe/Amsterdam" },
    { "section": "tokyo", "label": "Tokyo", "timezone": "Asia/Tokyo" },
    { "section": "hong-kong", "label": "Hong Kong", "timezone": "Asia/Hong_Kong" },
    { "section": "sydney", "label": "Sydney", "timezone": "Australia/Sydney" }
];


generateNavItems();
updateIndicator(nav.lastElementChild);
updateCityTime(cities[cities.length - 1].timezone);



function generateNavItems() {
    cities.reverse().forEach(city => {
        const li = document.createElement('li');
        const anchor = document.createElement('a');
        anchor.textContent = city.label;
        anchor.href = `#${city.section}`;

        li.appendChild(anchor);

        li.addEventListener('click', (e) => {
            e.preventDefault();
            updateIndicator(li);
            setActiveLink(anchor);
            updateCityTime(city.timezone);
            currTimeZone = city.timezone;
        });

        nav.appendChild(li);
    });
}

function updateIndicator(element) {
    const elementRect = element.getBoundingClientRect();
    const containerRect = nav.getBoundingClientRect();
    indicator.style.width = `${elementRect.width}px`;
    indicator.style.left = `${elementRect.left - containerRect.left}px`;

    document.querySelectorAll('.nav li').forEach(li => li.classList.remove('active'));
    element.classList.add('active');
}

function setActiveLink(anchor) {
    document.querySelectorAll('.nav a').forEach(a => {
        a.classList.remove('active');
        a.style.color = '#b6b6b6';
    });
    anchor.classList.add('active');
    anchor.style.color = 'black';
}


let currTimeZone = cities[cities.length - 1].timezone
function updateCityTime(timezone) {

    const updateTime = () => {
        const now = new Date().toLocaleTimeString("en-US", {
            timeZone: timezone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });


        cityTimeDisplay.textContent = `Current Time: ${now}`;

        if (currTimeZone !== timezone) {
            cityTimeDisplay.textContent = ``;
            timezone = currTimeZone;
            clearInterval(timeInterval);
        }
    };

    timeInterval = setInterval(updateTime, 1000);

}

window.addEventListener('resize', () => {
    const activeItem = document.querySelector('.nav li.active');
    if (activeItem) {
        updateIndicator(activeItem);
    }
});
