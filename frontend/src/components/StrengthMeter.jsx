import React from 'react'

export const StrengthMeter = ({ password }) => {


    const calculatePasswordStrength = () => {
        let strength = 0;

        if (password.length > 9) strength += 1;
        if (password.match(/[a-z]+/)) strength += 1;
        if (password.match(/[A-Z]+/)) strength += 1;
        if (password.match(/[0-9]+/)) strength += 1;
        if (password.match(/[^a-zA-Z0-9]+/)) strength += 1;
        return strength;
    }

    function getStrengthBarColor(strength) {
        switch (strength) {
            case 1: return 'red';
            case 2: return 'orange';
            case 3: return 'yellow';
            case 4: return 'lightblue';
            case 5: return 'lightgreen';
            default: return 'gray';
        }
    }

    const strength = calculatePasswordStrength();
    const strengthBarColor = getStrengthBarColor(strength);
    const strengthBarStyle = {
        width: `${(strength / 5) * 100}%`,
        backgroundColor: strengthBarColor,
        filter: strength > 0 ? `drop-shadow( 0 0 5px ${strengthBarColor})` : 'none',
        transition: `width 0.5s ease-in-out, 
                background-color 0.5s ease-in-out,
                filter 0.5s ease-in-out`
    }

    return (
        <div className='strengthBar rounded-xl my-1 h-1'
            style={strengthBarStyle}
        >
        </div>
    )
}
