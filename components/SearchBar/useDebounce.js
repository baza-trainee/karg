import { useState, useEffect, useRef } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState('');
    const timeRef = useRef();

    useEffect(() => {
        timeRef.current = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(timeRef.current);
        };

    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;