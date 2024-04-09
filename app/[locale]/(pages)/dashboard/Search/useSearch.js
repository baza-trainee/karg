import { useState, useMemo } from "react";

function useSearch(data, searchProperty) {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredData = useMemo(() => {
        return searchTerm
            ? data.filter(item => item[searchProperty].toLowerCase().includes(searchTerm))
            : data
    }, [data, searchTerm, searchProperty]);

    return { searchTerm, setSearchTerm, filteredData };
}

export default useSearch;