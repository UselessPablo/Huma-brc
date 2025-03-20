import React, { useState, useEffect } from "react";
import taza from './fotos/tazas.jpg'
import platos from './fotos/platos.jpg'
import plabowl from './fotos/platobowl.jpg'
import porta from './fotos/porta.jpg'
import hornos from './fotos/hornitos.jpg'
import calderos from './fotos/caldero.jpg'


function Pagina() {

    return(
        <div className="mostrar">
           
            <img src={calderos} className="fotos" alt="Calderos" />
            <img src={hornos} className="fotos" alt="Hornitos" />
            <img src={porta} className="fotos" alt="Porta" />
            <img src={plabowl} className="fotos" alt="Plato Bowl" />
            <img src={taza} className="fotos" alt="Taza" />
        </div>
    )
}
export default Pagina;
