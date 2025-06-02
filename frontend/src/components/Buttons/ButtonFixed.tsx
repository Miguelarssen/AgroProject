/*
ButtonFixed é o botão presente no canto inferior direito das telas de cadastro.
*/

import { useState } from "react";
import "./ButtonFixed.css";

interface FloatingButtonsProps {
    onSubmit: () => void;
}

export function ButtonFixed({ onSubmit }: FloatingButtonsProps) {
    const [visible, setVisible] = useState(false);

    return (
        <div 
            className="btn-container"
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
        > 
            <div className="small-btn-container">
                <button className={`small-btn red ${visible ? "show" : ""}`} onClick={() => window.open("/Produtores/List", "_self")}><b className="pb-1">x</b></button>
                <button className={`small-btn blue ${visible ? "show" : ""}`} onClick={onSubmit}><b className="pb-1">+</b></button>
            </div>
            <button className="submitBtn" onClick={() => setVisible(!visible)}></button>
        </div>
    );
}
