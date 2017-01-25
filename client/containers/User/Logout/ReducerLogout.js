export default function (state, action) {
    if (action.type === 'logout') {
        const {user} = state;
        window.sessionStorage.removeItem('token');
        Object.keys(user).forEach(key => user[key] = '');
        return {...state};
    }
}
