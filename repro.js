
const START_DATE = new Date(2025, 10, 18);
START_DATE.setHours(0, 0, 0, 0);
// Simulate Today as Jan 24, 2026
const TODAY = new Date(2026, 0, 24);
TODAY.setHours(0, 0, 0, 0);

// Simulate High Resolution (High Daily Plays)
const daily = 5000; // High daily plays -> small horizon -> small step
const rarity = 10000;
const horizonDays = (rarity * 2.5) / daily; // 25000 / 5000 = 5 days horizon?
// Wait, if daily is high, horizon is small?
// Yes, if plays are 5000/day, rarity 10000 is reached fast.
// Horizon = 5 days.
// Start Date Nov 18. Today Jan 24. 
// If Today is WAY past horizon, the graph stops early.
// So for Today to be ON the graph, Horizon must cover ~67 days.
// So daily must be smaller?
// 67 days. (10000 * 2.5) / daily > 67 => 25000/daily > 67 => daily < 373.

// Let's use daily = 300.
// Horizon = 25000 / 300 = 83.3 days. Covers 67 days.
// Steps = 80.
// StepSize = 83.3 / 80 = 1.04 days.

// Let's try daily = 350.
// Horizon = 71.4 days.
// StepSize = 71.4 / 80 = 0.89 days. (Sub-day resolution)

function simulate(dailyPlays) {
    const horizonDays = (rarity * 2.5) / dailyPlays;
    const steps = 80;
    const stepSize = horizonDays / steps;
    const todayDays = Math.floor((TODAY - START_DATE) / (1000 * 60 * 60 * 24));

    console.log(`\nSimulation: Daily=${dailyPlays}, Horizon=${horizonDays.toFixed(1)}, StepSize=${stepSize.toFixed(3)}, TodayDays=${todayDays}`);

    let todayAdded = false;
    let selectedDay = null;

    for (let i = 0; i <= horizonDays; i += stepSize) {
        const dayNumber = Math.round(i);
        const d = new Date(START_DATE);
        d.setDate(d.getDate() + dayNumber);

        const isToday = Math.abs(dayNumber - todayDays) <= 1;

        if (isToday) {
            console.log(`  Checking Point: dayNum=${dayNumber} (${d.toDateString()}), Diff=${Math.abs(dayNumber - todayDays)}, todayAdded=${todayAdded}`);
        }

        if (isToday && !todayAdded) {
            todayAdded = true;
            selectedDay = d;
            console.log(`    -> MARKED AS TODAY: ${d.toDateString()}`);
        }
    }
    return selectedDay;
}

simulate(350); 
