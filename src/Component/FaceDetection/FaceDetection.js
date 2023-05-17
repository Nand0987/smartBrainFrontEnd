import React from 'react';
import './FaceRecognition.css';

const FaceDetection = ({ urlval, box }) => {
  if(Boolean(urlval))
  {
    return (
      <div className='outer'>
      <div style={{width:'33.33%'}} ></div>
      <div style={{width:'33.33%'}} className='container' >
      <img id='inputimage' src={urlval} style={{width:'100%',height:'auto'}}/>
      <div className='centered' style={{top:`${box.newtop}%`,marginLeft:`${box.newleft}px`}} >
      <div style={{height:`${box.newheight}px`,width:`${box.newwidth}px`,border:'1px solid'}}></div>
        </div>
    
      </div>
      <div style={{width:'33.33%' }}>
      <h1>Age:{box.age}</h1>
      <h1>Gender:{box.gender}</h1>
      </div>
    </div>
       
    )
  };
}


export default FaceDetection;