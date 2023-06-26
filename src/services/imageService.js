export const uploadImage = async (base64) => {
    try {
        const response = await fetch('/api/images', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(base64),
        });

        if (response.ok) {
            return await response.text();
        } else {
            return null;
        }
    } catch (error) {
        console.error('Failed to upload image', error);
        return null;
    }
};