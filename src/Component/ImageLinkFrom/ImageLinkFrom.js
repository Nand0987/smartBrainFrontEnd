function ImageLinkFrom({onSubmit,onChange})
{
  return (
     
    <div className=".outer">
        <p style={{textAlign:"center" }}>This Magic Brain Will Detect Face In Your Picture.Git it a try</p>
        <div className="form">
        <input type="text" className="i" onChange={onChange}/>
        <button className="i1" onClick={onSubmit}>Detect</button>
        </div>
      
    </div>
   
    );
}










export default ImageLinkFrom;