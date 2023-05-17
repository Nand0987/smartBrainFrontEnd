import Cookies from "js-cookie";
import React from "react";
class Register extends React.Component {
  constructor() {
    super()
    this.state = {
      Name: '',
      Email: '',
      Password: ''
    }
  }
  onNameChange = (event) => {
    this.setState({ Name: event.target.value })
  }

  onPasswordChange = (event) => {
    this.setState({ Password: event.target.value })
  }

  onEmailChange = (event) => {
    this.setState({ Email: event.target.value })
  }


  emailCheck=()=>{
  
  }


  onRegister = () => {
    fetch('http://localhost:3000/emailCheck', {
      method: 'post',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({ Email:this.state.Email})
    }).then((response)=>response.json()).
    then((data)=>{
    if(data==true)
    {    fetch('http://localhost:3000/Register', {
      method: 'post',
      headers: { 'content-Type': 'application/json' },
      body: JSON.stringify({ Email: this.state.Email, Name: this.state.Name, Password: this.state.Password })
    }).then((response) => response.json()).then((data) => {
        Cookies.set('id',data.id)
        this.props.loadUser(data)
        this.props.Register('Home')
    })}
    else
    {
      document.getElementById('err1').innerText='*This address is already used'
      document.getElementById('err1').style.border='4px solid'
      document.getElementById('err1').style.borderRadius='10px'
    }
    }).
    catch((err)=>{console.log(err)}) 



  }


  render() {
    return (

      <article className="br3  --black-10 mv4 w-100 w-50-m w-25-l  shadow-5 mw6 center" style={{ width: '30%', height: 'auto', border: '1px solid' }}>
        <main className="pa4 black-80">
          <form className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className=" fw6 ph0 mh0" style={{ fontSize: "xxx-large" }}>Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name" id="name" />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input onBlur={this.emailCheck} onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address" id="email-address" />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" />
              </div>

            </fieldset>
            <div className="">
              <a onClick={this.onRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Register" style={{fontWeight:'bold'}} >Register</a>
            </div>
            <p id='err1' style={{color:'red'}}></p>
          </form>
        </main>
      </article>

    )
  }
}
export default Register;