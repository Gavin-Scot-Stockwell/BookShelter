import { useState, useEffect } from 'react';

const ModNumber = () => {
    // Initialize the state with the value from localStorage or default to 0.1
    const [modOut, setModOut] = useState(() => {
        const savedModOut = localStorage.getItem("modOut");
        return savedModOut ? parseFloat(savedModOut) : 0.1;
    });

    // Use useEffect to save the value to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("modOut", modOut.toString());
    }, [modOut]);

    // Function to handle input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        localStorage.removeItem("bookstores");
        setModOut(parseFloat(e.target.value));
    };

    return (
        <div>   
            <label>Enter a number:</label>
            <input
                type="number"
                step="0.1"
                placeholder="Enter a number"
                value={modOut}
                onChange={handleInputChange}
            />
        </div>
    );
};

export default ModNumber;