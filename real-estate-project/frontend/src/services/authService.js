const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const loginUser = async (credentials) => {
    const response = await fetch(`${BASE_URL}/auth/api/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(credentials),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
    }

    return response.json();
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(userData),
        });

        const data = await response.text(); // First get response as text
        let parsedData;
        
        try {
            // Try to parse as JSON
            parsedData = JSON.parse(data);
        } catch (e) {
            // If parsing fails, use the text as is
            if (!response.ok) {
                throw new Error(data || 'Registration failed');
            }
            // If response was successful but not JSON, return generic object
            return { success: true, message: data };
        }
        
        // Handle error responses with JSON body
        if (!response.ok) {
            throw new Error(parsedData.message || 'Registration failed');
        }
        
        return parsedData;
    } catch (error) {
        console.error("Registration request error:", error);
        throw error;
    }
};
export const getUser = async () => {
    const response = await fetch('/api/user');
    if (response.ok) {
        return response.json();
    }
    return null;
};

export const logout = async () => {
    await fetch('/api/logout', { method: 'POST' });
};