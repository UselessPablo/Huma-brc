import React, { useState, useEffect } from "react";
import './App.css'

function Siguiente({nombre}){
   const [name, setName] = useState('')
   

    useEffect(() => {
        setName(nombre);
    }, [nombre]); 
 
   
   return(
<div >
<div className="fuck App-logo">
            <h1>Fuck You {name}</h1>
           
</div>
     <div>
        <h3>Que queres hacer ?</h3>
     </div>
     
       </div>


    )
}
export default Siguiente;