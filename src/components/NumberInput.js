import React from "react";

const NumberInput = ({ label, value, onChange }) => {
    return (
        <label>
            {label}:
            <input
                type="number"
                value={value}
                onChange={onChange}
                min={4}
                max={10}
                step={1}
            />
        </label>
    );
};

export default NumberInput;