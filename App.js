import React, { useEffect, useState } from 'react';
import "./App.css";

export default function App() {

const [item,setitem]=useState([]);
const [page,setpage]=useState(1);


const fetchProduct=async()=>{
    const res=await fetch("https://dummyjson.com/products")
      const data=await res.json();
      
     if(data && data.products){
      setitem(data.products);
     }


      
      console.log(item);
}    
   
useEffect(()=>{
  fetchProduct();
},[])

const selectpagination=(selectpage)=>{

 if (selectpage >= 1 && selectpage < item.length /10 && selectpage !== page ){
  setpage(selectpage);
}
}


    return(
      <>
         {item.length > 0 && ( 
         
             
         <div className='products'>
        
               { 
            
                  item.slice(page*10-10 , page*10).map((prod)=>{
                    return(
                     
                      <>
                      <div className='product_single'>
                     <img src={prod.thumbnail} alt={prod.title}/>
                     <span>{prod.title}</span>
                   </div>
              </>
                      
                    )
                  })
                
               }
               </div>    
        
      
               )}


            {item.length >0 &&  ( <div className='pagination'> 
             <span  className={page >= 1 ? "" : "pagination_selected" }  onClick={()=>selectpagination(page+-1) }>◀</span>

             
              {[...Array(item.length / 10)].map((_,i)=>{
                return <span   onClick={()=>selectpagination(i+1)}  key={i}>{i + 1 }</span>;
              })
              }
              <span onClick={()=>selectpagination(page+1)}
                    className={page < item.length /3 ? "" : "pagination_disable"} >▶</span>

            
     
          </div>
        )}

      </>
              
    )}