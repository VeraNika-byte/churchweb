// Zde můžete přidat datum, které není neděle, ale chcete, aby se zobrazovalo v kalendáři a v liště akcí
const masses = [
    { date: new Date(2024, 9, 29), time: "10:45", description: "Stavění sněhuláků" },
    { date: new Date(2024, 9, 30), time: "5:18", description: "Šišková bitva" },
    { date: new Date(2024, 9, 12), time: "18:10", description: "Sbírání listí" }
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
 
     const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
     const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
 
     const calendarContainer = document.getElementById('calendar');
     calendarContainer.innerHTML = '';
 
     const startDay = firstDayOfMonth.getDay();
 
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
             dayElement.addEventListener('click', () => {
                 openModal("V tento den probíhá nedělní mše v 10:45 v kostele v Lochenicích");
             });
         }
 
         const mass = masses.find(m => m.date.toDateString() === date.toDateString());
         if (mass) {
             dayElement.classList.add('mass-day');
             dayElement.title = `Čas: ${mass.time} - ${mass.description}`;
             dayElement.addEventListener('click', () => {
                 openModal(`${mass.description} dne ${formatDate(mass.date)} v ${mass.time}`);
             });
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
                 time: "10:45",
                 description: "Mše svatá"
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
 
 // Open modal window with specific text
 function openModal(text) {
     const modal = document.getElementById('modal');
     const modalText = document.getElementById('modal-text');
     modalText.textContent = text;
     modal.style.display = "block";
 }
 
 // Close the modal when the close button is clicked
 document.getElementById('modal-close').addEventListener('click', () => {
     document.getElementById('modal').style.display = "none";
 });
 
 // Close the modal when clicking outside the modal content
 window.addEventListener('click', (event) => {
     const modal = document.getElementById('modal');
     if (event.target === modal) {
         modal.style.display = "none";
     }
 });
 
 document.addEventListener('DOMContentLoaded', () => {
     generateCalendar();
     updateNextMassesInfo();
 });
 
