import React from "react";

const NumberInput = ({ label }) => {
    return (
        <label>
            {label}:
            <input
                type="number"
                value={4}
                readOnly
            />
        </label>
    );
};

export default NumberInput;