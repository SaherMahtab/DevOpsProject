import React from 'react';

const FlipButtons = () => {
    return (
        <div className="bg-yellow-500 h-screen flex items-center justify-center">
            <div className="space-x-4 border flex">
                <button className="flip-button" data-flip-text="Book Now">One Way</button>
                <button className="flip-button" data-flip-text="Book Now">Round Trip</button>
                <button className="flip-button" data-flip-text="Book Now">Airport Services</button>
            </div>
        </div>
    );
};

export default FlipButtons;