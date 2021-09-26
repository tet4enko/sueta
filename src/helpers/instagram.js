const INSTAGRAM_API_HOST = 'https://graph.instagram.com';

export const api = async (path) => {
    const response = await fetch(`${INSTAGRAM_API_HOST}${path}`);

    if (!response.ok) {
        const text = await response.text();
        throw new Error(`Instagram API returned ${response.status}. ${text}.`);
    }

    const data = await response.json();

    return data;
};
