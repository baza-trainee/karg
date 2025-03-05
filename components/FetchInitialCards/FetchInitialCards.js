const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const FetchInitialCards = async (locale, endpoint, method, pageSize, page = 1) => {
    try {
        const cultureCode = (locale === "uk") ? "ua" : "en";
        const url = `${API_BASE_URL}${endpoint}/${method}?page=${page}&pageSize=${pageSize}&cultureCode=${cultureCode}`;
        // console.log("Fetching data from:", url);
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("Data received:", data);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return { items: [], total: 0 };
    }
};

export default FetchInitialCards;