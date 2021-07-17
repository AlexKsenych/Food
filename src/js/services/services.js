const postData = async (url, data) => {
    const res = await fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json; charset=utf-8'
        },
        body: data
    });
    return await res.json();
};

const getCardData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`could not fetch ${url}, error: ${res.status}`);
    }

    return await res.json();
};

export {postData};
export {getCardData};