function LoginRegGarud (to, from , next) {
    if(localStorage.getItem("Auth")){
        let AuthData = JSON.parse(localStorage.getItem("Auth"));
        if(AuthData.isLogedIN == false){
            next();
        } 
    } if(!localStorage.getItem("Auth")){
         next();
    }
     else {
        next({ path:'/UserProfile' });
    }
}


export default LoginRegGarud;