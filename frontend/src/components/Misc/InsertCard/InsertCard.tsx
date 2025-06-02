/*
InsertCard é uma classe relacionada ao card de input dos produtores.
A ideia é futuramente o mesmo servir como um card colocávwel em qualquer classe.
*/

import "../../../style/App.css";
import "./insertCard.css";

import { DropDownEstados } from "../DropDownEstados/DropDownEstados";

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}   

interface InsertCardProps {
    nome: string;
    setNome: (value: string) => void;
    telefone: string;
    setTelefone: (value: string) => void;
    municipio: string;
    setMunicipio: (value: string) => void;
    comunidade: string;
    setComunidade: (value: string) => void;
    familiar: boolean;
    setFamiliar: (value: boolean) => void;
    estado: string;
    setEstado: (value: string) => void;
}

const Input = ({ label, value,  updateValue }: InputProps) => {
    return (
        <>
            <label className='p-2 fs-7'>{label}</label>
            <input className="form-control input" type="text" 
                placeholder={label} 
                value={value} 
                onChange={event => updateValue(event.target.value)} 
            />
        </>
    )
}


export function InsertCard({ 
    nome, setNome, telefone, setTelefone, 
    municipio, setMunicipio, comunidade, setComunidade, 
    familiar, setFamiliar, estado, setEstado
}: InsertCardProps) {
    return (
        <form className='d-flex flex-column w-100 text-wrap p-0'>

            <p className='TittleCard w-100 h-30 d-flex align-items-center py-3'>identificação</p>

            <div className='insertCard'>
                <div className='form-group col-md-5 p-2'>
                    <Input label="Nome" value={nome} updateValue={setNome} />
                </div>
                <div className='form-group col-md-5 p-2'>
                    <Input label="Telefone" value={telefone} updateValue={setTelefone} />
                </div>

                <div className="form-row d-flex flex-row">
                    <div className='form-group col-md-4 p-2'>
                        <Input label="Município" value={municipio}  updateValue={setMunicipio} />
                    </div>

                    <div className='form-group col-md-4 p-2'>
                        <Input label="Comunidade" value={comunidade} updateValue={setComunidade} />
                    </div>

                    <div className='form-group col-md-4 p-2 d-flex justify-contents-center flex-column'>
                        <label className='p-2 fs-7'>Estados</label>
                        <DropDownEstados value={estado} onChange={setEstado} placeholder="Estado de cadastro" />
                    </div>
                </div>

                <div className='form-group p-4'>
                    <label>Familiar</label>
                    <input className="form-check-input" type="checkbox" checked={familiar} onChange={event => setFamiliar(event.target.checked)} />
                </div>
            </div>

        </form>
    )   
}