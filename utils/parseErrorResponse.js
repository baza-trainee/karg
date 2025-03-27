export const parseErrorResponse = async (response) => {
    try {
        const contentType = response.headers.get('Content-Type');
        if (contentType && contentType.includes('application/json')) {
            const errorBody = await response.json();
            const errorMessage = (typeof errorBody === 'object' && errorBody.message)
                ? errorBody.message
                : errorBody;
            return { error: errorMessage || `API error: ${response.status}` };
        } else {
            const errorText = await response.text();
            return { error: errorText || `API error: ${response.status}` };
        }
    } catch (error) {
        console.error("Помилка при розборі error response:", error);
        return { error: `API error: ${response.status}` };
    }
};