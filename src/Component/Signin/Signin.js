import React from "react";
import Cookies from "js-cookie";

class Signin extends React.Component{
constructor()
{
  super()
  this.state={
    Email:'',
    Password:''
    
  }
  
}
onEmailChange=(event)=>{
this.setState({Email:event.target.value})

}
onPasswordChange=(event)=>{
  this.setState({Password:event.target.value})
  
}
SignInAgain=()=>{
  
 fetch('http://localhost:3000/signin',{
    method:'post',
    headers:{'content-Type':'application/json'},
    body:JSON.stringify({Email:this.state.Email,
    Password:this.state.Password})
  }).then((response)=>response.json()).then((val)=>{
  if(val.id)
  {
    Cookies.set('id',val.id)
    this.props.loadUser(val)
    this.props.onSignIn('Home')
  }
  }).catch((err)=>{
    document.getElementById('err').innerText='*Incorrect email address or password'
    document.getElementById('err').style.border='2px solid'
    document.getElementById('err').style.borderRadius='10px'
  })
}
  render(){
  return (
   <article className="br3  --black-10 mv4 w-100 w-50-m w-25-l  shadow-5 mw6 center" style={{width:'30%',height:'auto' ,  border:'1px solid'}}>
   <main className="pa4 black-80">
  <form className="measure">
    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
      <legend className=" fw6 ph0 mh0" style={{fontSize:"xxx-large"}}>Sign In</legend>
      <div className="mt3">
        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address"/>
      </div>
      <div className="mv3">
        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password"/>
      </div>
    </fieldset>
    <div style={{width:'70px',margin:'auto'}}>
    <a onClick={this.SignInAgain} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" style={{fontWeight:'bold'}} >Submit</a>
    </div>
    <p id='err' style={{color:'red'}}></p>
    <div className="lh-copy mt3">
        <a onClick={()=>this.props.onRegister('Register')} href="#0" className="f6 link dim black db">Register</a>
    </div>
  </form>
</main>
</article>

  )
}
}
export default Signin;