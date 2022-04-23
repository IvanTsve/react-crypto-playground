 const ENDPOINTS = {
    get_all: `https://api.nomics.com/v1/currencies/ticker?key=${apikey}3&per-page=11`,
    get_selected: `https://api.nomics.com/v1/currencies/ticker?key=${apikey}3&ids=`,
    register: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=`,
    login: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=`,
    post_data: `https://cryptoplayground-d3377-default-rtdb.asia-southeast1.firebasedatabase.app/`,
    get_data: `https://cryptoplayground-d3377-default-rtdb.asia-southeast1.firebasedatabase.app/`,
}

export default ENDPOINTS;