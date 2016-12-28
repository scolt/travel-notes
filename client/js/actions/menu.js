export function setMenuStatus(open) {
    return {
        type: open ? 'openLeftNavMenu' : 'closeLeftNavMenu'
    };
}
