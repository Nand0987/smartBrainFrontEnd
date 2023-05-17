import React from "react";
import Cookies from "js-cookie";
const Navigation=({onRouteChange,SignIn,route})=>{
    return (
    <div> 
    {
    route==='Home'?   <nav style={{display:"flex",justifyContent:"flex-end"}}>
    <p onClick={function (){SignIn('SignIn')}}  className=" f3 link dim black underline pa3 pointer" style={{cursor:'pointer',textDecorationLine:'underline'}}>Sign Out</p> 
    </nav>: <nav style={{display:"flex",justifyContent:"flex-end"}}>
    <p onClick={function (){SignIn('SignIn')}} className=" f3 link dim black underline pa3 pointer" style={{cursor:'pointer',textDecorationLine:'underline'}}>Sign In </p>
    <p  onClick={function (){onRouteChange('Register')}}  className=" f3 link dim black underline pa3 pointer" style={{cursor:'pointer',textDecorationLine:'underline' ,textIndent:'2rem'}}>Register</p>
    </nav>
    }
    </div>   
    )
    
}
export default Navigation;