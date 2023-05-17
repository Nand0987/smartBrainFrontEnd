import Navigation from './Component/Navigation/Navigation'
import './index.css'
import Logo from './Component/Logo/Logo'
import './Logo.css'
import './Image.css'
import React, { Component } from 'react'
import Rank from './Component/Rank/Rank'
import ImageLinkFrom from './Component/ImageLinkFrom/ImageLinkFrom'
import './App.css'
import FaceDetection from './Component/FaceDetection/FaceDetection'
import axios from 'axios';
import FormData from 'form-data';
import ParticlesBg from 'particles-bg'
import Signin from './Component/Signin/Signin'
import './Signin.css'
import Register from './Component/Register/Register'
import Cookies from 'js-cookie'
class App extends Component
{
constructor()
{
  super();
  this.state={
    Image:'',
    box:{},
    route:'SignIn',
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
    }
  }
}

onChange=(event)=>{
this.setState({Image:event.target.value})
}

rankChanger=()=>{
fetch('http://localhost:3000/id',{
  method:'post',
  headers:{'content-Type':'application/json'},
  body:JSON.stringify({id:this.state.user.id})
}).then((response)=>response.json()).then((data)=>{
this.setState(Object.assign(this.state.user, { entries: data.entries}))
})
}



BoxShow=(data,d)=>{

const newdata=data.faces[0].face_rectangle
const aHeight=JSON.parse(d).h
const awidht=JSON.parse(d).w
const top=((newdata.top)*100)/(aHeight);
const left=((newdata.left)*100)/(awidht);
const height=((newdata.height)*100)/(aHeight);
const width=((newdata.width)*100)/(awidht);
console.log(top,left,height,width);
const image=document.getElementById('inputimage')
const w = Number(image.width);
const h = Number(image.height);
return {
  newleft:(left*w)/100,
  newtop: top,
  newheight:(h*height)/100 ,
  newwidth:(w*width)/100,
  age:data.faces[0].attributes.age.value,
  gender:data.faces[0].attributes.gender.value
}

}

detectFace=(Box)=>{
 this.setState({box:Box}) 
}

onSubmit= () => {
  fetch('http://localhost:3000/image',{
    method:'post',
    headers:{'content-Type':'application/json'},
    body:JSON.stringify({url:this.state.Image})
  }).then((response)=>response.json()).then((data)=>{
    fetch('http://localhost:3000/size',{method:'post',
    headers:{'content-Type':'application/json'},
    body:JSON.stringify({url:this.state.Image})
  }).then((response)=>response.json()).then((d)=>{
  this.rankChanger();
  this.detectFace(this.BoxShow(data,d));
  })

  })
}

onRouteChange=(route)=>{
if(route==='SignIn')
{
Cookies.remove('id')
this.setState({route:'SignIn'})
}
else if(route==='Register')
{
this.setState({route:'Register'})
}
else if(route==='Home')
{
  this.setState({route:'Home'})
}
}

loadUser=(data)=>{
this.setState({user:{id:data.id,name:data.name,email:data.email,
entries:data.entries,joined:data.joined}})
}

render()
{
  if(this.state.route==='SignIn' && Boolean(Cookies.get().id) )
  {
    fetch('http://localhost:3000/id1',{
      method:'post',
      headers:{'content-Type':'application/json'},
      body:JSON.stringify({id:Cookies.get().id})
    }).then((response)=>response.json()).then((data)=>{
    this.loadUser(data);
    this.onRouteChange('Home')
    })
  
  }
  
  return (
    <div className='App'>
      <ParticlesBg type="circle" bg={true} />
    <Navigation onRouteChange={this.onRouteChange} SignIn={this.onRouteChange} route={this.state.route}/> 
    {
      this.state.route==='SignIn'? <Signin loadUser={this.loadUser} onSignIn={this.onRouteChange} onRegister={this.onRouteChange} />:(this.state.route==='Register'?<Register Register={this.onRouteChange} loadUser={this.loadUser}/>:(<div><Logo/>
      <Rank Rank={this.state.user.entries} userName={this.state.user.name}/> 
      <ImageLinkFrom onSubmit={this.onSubmit} onChange={this.onChange}/> 
      <FaceDetection urlval={this.state.Image} box={this.state.box}/> </ div>))
    }
    
   </div>
  );
}
}
export default App;
