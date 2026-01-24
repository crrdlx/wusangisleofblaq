
const START_DATE = new Date(2025, 10, 18);
START_DATE.setHours(0, 0, 0, 0);
const TODAY = new Date(2026, 0, 24);
TODAY.setHours(0, 0, 0, 0);

// Same parameters as repro
const daily = 350;
const rarity = 10000;

function verify(dailyPlays) {
    const horizonDays = (rarity * 2.5) / dailyPlays;
    const targetDays = (TODAY - START_DATE) / (1000 * 60 * 60 * 24);
    const steps = 80;
    const stepSize = horizonDays / steps;

    // Exact logic from the fix
    const todayIndex = Math.round(targetDays / stepSize);

    console.log(`\nVerification: Daily=${dailyPlays}, Horizon=${horizonDays.toFixed(1)}, StepSize=${stepSize.toFixed(3)}`);
    console.log(`TargetDays=${targetDays.toFixed(1)} -> Index=${todayIndex}`);

    for (let i = 0; i <= steps; i++) {
        const dayNumber = i * stepSize;
        const d = new Date(START_DATE);
        d.setDate(d.getDate() + dayNumber);

        if (i === todayIndex) {
            console.log(`  -> MARKED AS TODAY (Index ${i}): ${d.toDateString()}`);
            return d;
        }
    }
    return null;
}

verify(350); 
