export const calculateFare = (fare, distance) => {
    if (!fare || !distance) {
        return 0;
    }

    let multiplier;
    let totalFare
    
    if (distance >= 0 && distance <= 10) {
        multiplier = 5;
        totalFare = fare * multiplier * 10;
        return totalFare.toFixed(2);

    } else if (distance >= 10.01 && distance <= 15) {
        multiplier = 4.5;
        totalFare = fare * multiplier * 15;
        return totalFare.toFixed(2);

    } else if (distance >= 15.01 && distance <= 20) {
        multiplier = 4.5;
        totalFare = fare * multiplier * 20;
        return totalFare.toFixed(2);

    } else if (distance >= 20.01 && distance <= 30) {
        multiplier = 3.5;
        totalFare = fare * multiplier * 25;
        return totalFare.toFixed(2);

    } else if (distance >= 30.01 && distance <= 35) {
         multiplier = 3.5;
        totalFare = fare * multiplier * 30;
        return totalFare.toFixed(2);

    } else if (distance >= 35.01 && distance <= 40) {
        multiplier = 3.5;
        totalFare = fare * multiplier * 35;
        return totalFare.toFixed(2);

    } else if (distance >= 40.01 && distance <= 50) {
        multiplier = 3.5;
        totalFare = fare * multiplier * 40;
        return totalFare.toFixed(2);

    } 
    else if (distance >= 50.01 && distance <= 100) {
        multiplier = 2.75;
        totalFare = fare * multiplier * distance;
        return totalFare.toFixed(2);
    } 
    else if (distance >= 100.01 && distance <= 150) {
        multiplier = 2;
        totalFare = fare * multiplier * distance;
        return totalFare.toFixed(2);
    } 
    else if (distance >= 150.01 && distance <= 300) {
        multiplier = 1.75;
        totalFare = fare * multiplier * distance;
        return totalFare.toFixed(2);
    } 
    else if (distance > 300) {
        multiplier = 2;
        totalFare = fare * multiplier * distance;
        return totalFare.toFixed(2);
    } 
   

};



import dayjs from 'dayjs';

export const calculateFareRoundTrip = (fare, distance, returnDate, pickupDate) => {
    // Parse the dates using dayjs and ensure the time component is removed
    const returnDateObj = dayjs(returnDate).startOf('day');
    const pickupDateObj = dayjs(pickupDate).startOf('day');
    
    // Calculate the difference in days and add 1 to include the pickup date
    let calculateDate = returnDateObj.diff(pickupDateObj, 'day') + 1;
    
    
    if (!fare || !distance) {
        return 0;
    }

    let totalFare;
    let doubleDistance = distance * 2;
    let minimumDistancePrice = calculateDate * 300; 
    let doubleDistanceXcarFare = doubleDistance * fare;
    let minimumDistanceXCarFare = minimumDistancePrice * fare;

    if (doubleDistanceXcarFare > minimumDistanceXCarFare) {
        totalFare = doubleDistanceXcarFare;
    } else {
        totalFare = minimumDistanceXCarFare;
    }

    return totalFare.toFixed(2);
};


// Example usage
// Output should be a valid fare

