export default function (state, action) {
    if (action.type === 'logout') {
        const {user} = state;
        window.localStorage.removeItem('token');
        Object.keys(user).forEach(key => user[key] = '');
        return {...state};
    }
}
