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