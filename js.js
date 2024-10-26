// Zde můžete přidat datum, které není neděle , ale chcete aby se zobrazovalo v kalendáři a v liště akcí
// stačí pouze změnit přednastavené datum, čas a description
// pro vytvoření dalších akcí stačí pouze zduplikovat první kód a nezapomenout na čárku na konci řádku :) ,
// akce se zobrazují v kalendáři i na liště :) |
//                                             v
const masses = [
   { date: new Date(2024, 9, 12), time: "8:20", description: "Stavění sněhuláků" },
   { date: new Date(2024, 9, 23), time: "9:15", description: "Sbírání listí" },
{ date: new Date(2024, 9, 29), time: "23:59", description: "Koukaní na film" }
];

function generateCalendar() {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const monthNames = [
        "Leden", "Únor", "Březen", "Duben", "Květen", "Červen",
        "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"
    ];
    document.getElementById('month-name').textContent = monthNames[currentMonth];

    const dayNames = ["Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"];

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const calendarContainer = document.getElementById('calendar');
    calendarContainer.innerHTML = '';

    // Vytvoření řádku s názvy dnů
    const dayNamesRow = document.createElement('div');
    dayNamesRow.classList.add('day-names-row');
    dayNames.forEach(dayName => {
        const dayNameElement = document.createElement('div');
        dayNameElement.classList.add('day-name');
        dayNameElement.textContent = dayName;
        dayNamesRow.appendChild(dayNameElement);
    });
    calendarContainer.appendChild(dayNamesRow);

    const startDay = (firstDayOfMonth.getDay() + 6) % 7; // Adjusting to start from Monday

    for (let i = 0; i < startDay; i++) {
        const blankDay = document.createElement('div');
        blankDay.classList.add('calendar-day');
        calendarContainer.appendChild(blankDay);
    }

    for (let day = 1; day <= lastDayOfMonth.getDate(); day++) {
        const date = new Date(currentYear, currentMonth, day);
        const dayElement = document.createElement('div');
        dayElement.classList.add('calendar-day');
        dayElement.textContent = day;

        if (date.getDay() === 0) {
            dayElement.classList.add('highlight');
            dayElement.title = `Mše svatá v 10:45`;
        }

        const mass = masses.find(m => m.date.toDateString() === date.toDateString());
        if (mass) {
            dayElement.classList.add('mass-day');
            dayElement.title = `Čas: ${mass.time} - ${mass.description}`;
        }

        calendarContainer.appendChild(dayElement);
    }
}

function updateNextMassesInfo() {
    const today = new Date();
    const nextMasses = [];

    for (let i = 0; i < 60; i++) {
        const nextDay = new Date(today);
        nextDay.setDate(today.getDate() + i);

        if (nextDay.getDay() === 0) {
            nextMasses.push({
                date: nextDay,
                time: "10:45", //Čas nedělní mše se dá změnit tady
                description: "Mše svatá" //Pokud je neděle, ale nejedná se o Mši svatou dá se to změnit zde v ,,description,,
            }); 
        }

        const mass = masses.find(m => m.date.toDateString() === nextDay.toDateString());
        if (mass) {
            nextMasses.push(mass);
        }

        if (nextMasses.length >= 2) {
            break;
        }
    }

    const nextMassesElement = document.getElementById('next-masses');

    if (nextMasses.length > 0) {
        if (nextMasses.length > 1) {
            const firstMass = nextMasses[0];
            const secondMass = nextMasses[1];
            const diffInDays = Math.abs((secondMass.date - firstMass.date) / (1000 * 60 * 60 * 24));

            if (diffInDays <= 6) {
                const massInfo = `${formatDate(firstMass.date)} v ${firstMass.time} - ${firstMass.description} | ${formatDate(secondMass.date)} v ${secondMass.time} - ${secondMass.description}`;
                nextMassesElement.textContent = massInfo;
            } else {
                nextMassesElement.textContent = `${formatDate(firstMass.date)} v ${firstMass.time} - ${firstMass.description}`;
            }
        } else {
            const massInfo = `${formatDate(nextMasses[0].date)} v ${nextMasses[0].time} - ${nextMasses[0].description}`;
            nextMassesElement.textContent = massInfo;
        }
    } else {
        nextMassesElement.textContent = "Žádné plánované akce.";
    }
}

function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}

document.addEventListener('DOMContentLoaded', () => {
    generateCalendar();
    updateNextMassesInfo();
});
