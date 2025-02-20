const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function getAnimals(page, pageSize = 6, CategoryFilter, NameSearch, cultureCode) {
    const apiUrl = `${API_BASE_URL}/api/animal/getall?Page=${page}&PageSize=${pageSize}&CategoryFilter=${CategoryFilter}&NameSearch=${NameSearch}&cultureCode=${cultureCode}`;

    try {
        const response = await fetch(apiUrl);

        if (response.status === 404) {
            return { animals: [] };
        }

        if (!response.ok) {
            throw new Error(`Failed to fetch: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error(error);
        return null;
    }
}