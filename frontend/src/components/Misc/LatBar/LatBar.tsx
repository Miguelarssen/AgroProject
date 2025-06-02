/*
O LatBar é o componente que se refere à barra lateral das telas, permamente em muitas 
delas.
*/

import "./LatBar.css";
import { ButtonAdd }from '../../Buttons/ButtonAdd.tsx';

export function LatBar() {
    return (
        <div id = "lat">
            <ButtonAdd></ButtonAdd>
        </div>
    );
}
