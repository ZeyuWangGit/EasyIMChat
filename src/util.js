

export function getRedirectPath({userType}){
    let url = (userType==='leader')?'/leaderinfo':'/memberinfo';
    return url;
}