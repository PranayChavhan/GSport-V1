import React, { useState } from "react";

export default function Certifications() {
    const winners = [
        { id: 1, name: "Winner 1", prize: "First Prize" },
        { id: 2, name: "Winner 2", prize: "Second Prize" },
        { id: 3, name: "Winner 3", prize: "Third Prize" },
        // Add more winner details as needed
    ];

    const [showWinnerDetails, setShowWinnerDetails] = useState(false);

    const toggleWinnerDetails = () => {
        setShowWinnerDetails(!showWinnerDetails);
    };

    return (
        <div className="text-center pt-2 min-h-screen">
            <button
                className="text-gray-900 text-bold text-2xl border-2 rounded-md shadow-lg focus:ring-2 focus:ring-orange-200 px-8 transition duration-100 ease-in-out hover:text-white hover:bg-orange-200"
                onClick={toggleWinnerDetails}
            >
                Winner Details
            </button>
            {showWinnerDetails && (
                <div className="bg-gray-100 p-4 mt-4 rounded-lg shadow-md">
                    {winners.map((winner) => (
                        <div key={winner.id} className="mb-2">
                            <p className="font-semibold">{winner.name}</p>
                            <p className="text-gray-600">{winner.prize}</p>
                        </div>
                    ))}
                </div>
            )}
            
            {/* Two additional buttons in a horizontal line */}
            <div className=" flex justify-center gap-4 mt-8">
                <button className="text-white border-2 rounded-md shadow-lg px-4 bg-orange-200 font-bold">
                    Upload Certificates Template
                </button>
                <button className="text-white border-2 rounded-md shadow-lg px-4 bg-orange-200 font-bold">
                   Roll out Certificates
                </button>
            </div>
        </div>
    );
}