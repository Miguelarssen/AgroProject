/*
O ButtonAdd é um botão posicionado dentro da barra lateral, que abre a tela de adicionar
*/

import "./ButtonAdd.css";
import addButton from "../../assets/addButton.png";

const handleClick = () => {
    ; 
};

export function ButtonAdd() {
    return (
        <button className="button-add" onClick={() => window.open("/Produtores/Create", "_self")}>
            <img className="d-flex justify-content-center align-items-center" src={addButton} />
        </button>
    );
}
