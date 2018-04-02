

export function getRedirectPath(data){
    const {userType, department} = data;
    let url = (userType==='leader')?'/leader':'/member';
    if (!department){
        url += 'info';
    }
    return url;
}