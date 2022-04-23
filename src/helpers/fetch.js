function getData(url, params) {
    return fetch(url, params)
        .then(r => r.json())
}

export default getData;