const Rank=({userName,Rank})=>{
return (
   <div style={{textAlign:"center" ,color:'white'}}>
     <h3 >
       {userName},Your Current rank is ...
    </h3>
    <h3 >#{Rank}</h3>
   </div>
);
}
export default Rank;