const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiSearch = async (cultureCode, nameSearch, page = 1, pageSize = 30) => {
    try {
        const response = await fetch(
            `${API_BASE_URL}api/animal/getall?page=${page}&pageSize=${pageSize}&cultureCode=${cultureCode}&nameSearch=${nameSearch}`,
            {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }
        );

        if (!response.ok) {
            console.error(`Failed to fetch: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error in apiSearch:', error);
        throw error;
    }
};