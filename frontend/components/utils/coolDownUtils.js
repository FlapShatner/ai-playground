export const getTimeLeft = (cooldownTime) => {
    const timeDiff = Date.now() - cooldownTime;
    console.log("Time Diff:", timeDiff);
    // const currTimeLeft = 8000 - timeDiff;
    const currTimeLeft = 86400000 - timeDiff
    console.log("Current Time Left:", currTimeLeft);
    return currTimeLeft;
}

export const getHoursAndMinutes = (currTimeLeft) => {
    const hours = Math.floor((currTimeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((currTimeLeft % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
}