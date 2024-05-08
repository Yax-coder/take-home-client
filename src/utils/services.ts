export const baseUrl = 'https://take-home-server.onrender.com/api';

export const postRequest = async (url: string, body: any) => {
    const response = await fetch(url, {
        method: 'Post',
        headers: {
            "Content-Type": "application/json"
        },
        body
    })

    const data = await response.json()

    if (!response.ok) {
        let message
        if (data?.message) {
            message = data.message
        } else {
            message = data
        }
        return { error: true, message }
    }
    return data;
}

export const getRequest = async (url: string) => {
    const response = await fetch(url);

    const data = await response.json();

    if (!response.ok) {
        let message = 'An Errror Occured...'
        if (data?.message) {
            message = data.message
        } else {
            message = data
        }
        return { error: true, message }
    }

    return data;
}