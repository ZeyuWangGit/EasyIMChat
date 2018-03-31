

export function getRedirectPath({userType, avatar}){
    let url = (userType==='leader')?'/leader':'member';
    if(!avatar){
        url += 'info';
    }
    return url;
}