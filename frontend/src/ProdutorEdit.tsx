import "./style/App.css";
import { LatBar } from './components/Misc/LatBar/LatBar.tsx';
import { InsertCard }from './components/Misc/InsertCard/InsertCard.tsx';
import {ButtonFixed} from "./components/Buttons/ButtonFixed.tsx"

import './style/ProdutorCreate.css';
import { useState } from "react";
import { Produtores } from "./interface/Produtores.ts";
import { CreateProdutor } from "./hooks/CreateProdutor.ts";

export function ProdutorEdit(){
  
      const { mutate, isSuccess, isPending } = CreateProdutor();
      const [nome, setNome] = useState<string>("");
      const [telefone, setTelefone] = useState<string>("");
      const [municipio, setMunicipio] = useState<string>("");
      const [comunidade, setComunidade] = useState<string>("");
      const [familiar, setFamiliar] = useState<boolean>(false);
      const [estado, setEstado] = useState<string>("");
      const [dataCadastro, setDataCadastro] = useState<Date | null>(null);

      const [successMessage, setSuccessMessage] = useState<boolean>(false);
      const submit = () =>{

        const produtor: Produtores = {
            id,
            nome,
            telefone,
            municipio,
            comunidade,
            familiar,
            estado,
            dataCadastro
        }

        mutate(produtor)

        setNome("");
        setTelefone("");
        setMunicipio("");
        setComunidade("");
        setFamiliar(false);
        setEstado("");
        setDataCadastro(null);

        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000);
    };

    return(

      <div id = "produtores">

        <LatBar/>
        <div id = "work">
          <header className='d-flex flex-column w-100 justify-content-start header'>
            <p id = "titlleProd" className='w-100 h-100 m-0'>Produtores</p>
          </header>

          <main className='d-flex flex-grow-1 flex-column justify-content-start align-items-center'>
            {successMessage && (
              <div className="success-message">Produtor cadastrado com sucesso!</div>
            )}

            <InsertCard
                  nome={nome} setNome={setNome}
                  telefone={telefone} setTelefone={setTelefone}
                  municipio={municipio} setMunicipio={setMunicipio}
                  comunidade={comunidade} setComunidade={setComunidade}
                  familiar={familiar} setFamiliar={setFamiliar}
                  estado={estado} setEstado={setEstado}
            />          
            
          </main>

        </div>
      <ButtonFixed onSubmit={submit} />
      </div>
    )
}
