export const parseErrorResponse = async (response) => {
    try {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const errorBody = await response.json();
            const errorMessage = (typeof errorBody === 'object' && errorBody.message)
                ? errorBody.message
                : errorBody;
            return {
                status: response.status,
                error: errorMessage || `API error: ${response.status}`,
            };
        } else {
            const errorText = await response.text();
            return {
                status: response.status,
                error: errorText || `API error: ${response.status}`,
            };
        }
    } catch (error) {
        console.error("Помилка при розборі error response:", error);
        return {
            status: response?.status || 0,
            error: `API error: ${response?.status}`
        };
    }
};