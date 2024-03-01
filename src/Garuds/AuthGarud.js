function AuthGarud (to, from , next) {
    if(localStorage.getItem("Auth")){
        let AuthData = JSON.parse(localStorage.getItem("Auth"));
        if(AuthData.isLogedIN){
            next();
        } 
    } else {
        next({ path:'/LoginRegister', name:'LoginRegister' });
    }
}


export default AuthGarud;


