document.addEventListener("DOMContentLoaded", function () {
    const outputDiv = document.getElementById("result");
    const quoteDiv = document.getElementById("quote");
    outputDiv.style.display = "none"; 
    quoteDiv.style.display = "none"; 

    document.getElementById("calculateBtn").addEventListener("click", function () {
        const presentInput = document.getElementById("present");
        const totalInput = document.getElementById("total");
        const percentageSelect = document.getElementById("percentage");

        let present = parseInt(presentInput.value);
        let total = parseInt(totalInput.value);
        let percentage = parseInt(percentageSelect.value);

        outputDiv.style.display = "none"; 
        quoteDiv.style.display = "none"; 

        if (isNaN(present) || isNaN(total) || isNaN(percentage)) {
            outputDiv.innerText = "Wake up from sleep and input the numbers correctly!";
            outputDiv.style.display = "block"; 
            return;
        }

        if (total < 0) {
            outputDiv.innerText = "Total classes cannot be negative.";
            outputDiv.style.display = "block"; 
            return;
        }

        if (present < 0) {
            outputDiv.innerText = "You should be in the Guinness Book of World Records for attending that many classes.";
            outputDiv.style.display = "block"; 
            return;
        }

        if (present > total) {
            outputDiv.innerText = "Having private sessions with the teacher? Hmm Hmm.";
            outputDiv.style.display = "block"; 
            return;
        }

        if (total === 0) {
            if (present === 0) {
                outputDiv.innerText = "Let the classes start!";
            } else {
                outputDiv.innerText = "Are you attending the classes in your dreams?";
            }
            outputDiv.style.display = "block"; 
            return;
        }

        if (present / total >= percentage / 100) {
            const daysAvailableToBunk = daysToBunk(present, total, percentage);
            outputDiv.innerHTML = daysToBunkText(daysAvailableToBunk, present, total);
            outputDiv.style.display = "block"; 
            quoteDiv.innerHTML = getRandomQuote(true); 
            quoteDiv.style.display = "block"; 
        } else {
            const attendanceNeeded = reqAttendance(present, total, percentage);
            outputDiv.innerHTML = daysToAttendClassText(attendanceNeeded, present, total, percentage);
            outputDiv.style.display = "block"; 
            quoteDiv.innerHTML = getRandomQuote(false); 
            quoteDiv.style.display = "block"; 
        }
    });
});

const reqAttendance = (present, total, percentage) => {
    return Math.ceil((percentage * total - 100 * present) / (100 - percentage));
};

const daysToBunk = (present, total, percentage) => {
    return Math.floor((100 * present - percentage * total) / percentage);
};

const daysToBunkText = (daysAvailableToBunk, present, total) =>
    `<div class="bunk-allowed">
        <span class="icon">✅</span>
        <span>You can bunk for <strong>${daysAvailableToBunk}</strong> more days!</span>
     </div>
     <div class="bunk-summary">
        <span>Current Attendance:</span>
        <span><strong>${present}/${total}</strong> ➡️ <strong>${(
      (present / total) *
      100
    ).toFixed(2)}%</strong></span>
     </div>
     <div class="attendance-detail">
        <span>Attendance after ${daysAvailableToBunk} bunks:</span>
        <span><strong>${present}/${daysAvailableToBunk + total}</strong> ➡️ <strong>${(
      (present / (daysAvailableToBunk + total)) *
      100
    ).toFixed(2)}%</strong></span>
     </div>`;

const daysToAttendClassText = (attendanceNeeded, present, total, percentage) =>
    `<div class="bunk-allowed">
        <span class="icon">❌</span>
        <span>You need to attend <strong>${attendanceNeeded}</strong> more classes!</span>
     </div>
     <div class="bunk-summary">
        <span>Current Attendance:</span>
        <span><strong>${present}/${total}</strong> ➡️ <strong>${(
      (present / total) *
      100
    ).toFixed(2)}%</strong></span>
     </div>
     <div class="attendance-detail">
        <span>Attendance required for ${percentage}%:</span>
        <span><strong>${attendanceNeeded + present}/${
      attendanceNeeded + total
    }</strong> ➡️ <strong>${(
      ((attendanceNeeded + present) / (attendanceNeeded + total)) *
      100
    ).toFixed(2)}%</strong></span>
     </div>`;

const getRandomQuote = (canBunk) => {
    const bunkQuotes = [
        "Life's too short to attend all classes!",
        "Bunk now, regret never.",
        "A little bunk never hurt anyone.",
        "Class? I thought you said nap time!",
        "Sometimes you just need to hit the snooze button on life.",
        "Bunking classes: a fine art!",
        "The best lessons are learned outside the classroom.",
        "A wise person once said: 'Bunk responsibly!'"
    ];

    const attendQuotes = [
        "Better attend or you'll regret it!",
        "Attendance is key to success.",
        "No bunking today, success tomorrow!",
        "A class a day keeps the F away.",
        "Don't let your dreams be dreams. Attend!",
        "Success requires attendance.",
        "Be there or be square!",
        "Education is the key, don't miss the chance!"
    ];

    const quotes = canBunk ? bunkQuotes : attendQuotes;
    return quotes[Math.floor(Math.random() * quotes.length)];
};
