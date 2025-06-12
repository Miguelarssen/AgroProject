import "./style/App.css";
import { LatBar } from './components/Misc/LatBar/LatBar.tsx';
import { InsertCard }from './components/Misc/InsertCard/InsertCard.tsx';
import {ButtonFixed} from "./components/Buttons/ButtonFixed.tsx"

import './style/ProdutorCreate.css';
import { useState } from "react";
import { Produtores } from "./interface/Produtores.ts";
import { EditProdutor } from "./hooks/EditProdutor.ts";
import { useParams } from 'react-router-dom';
import {locateProdutorById} from "./hooks/LocateProdutorById.ts"
export function ProdutorEdit() {
    const { id } = useParams() as { id: string };
    const idProdutor = parseInt(id);
    const { data, isLoading, isError } = locateProdutorById(idProdutor);

    if (isLoading) return <p>Carregando...</p>;
    if (isError || !data || data.length === 0) return <p>Produtor não encontrado.</p>;

    // Somente agora que os dados estão garantidos, definimos os estados
    const produtor = data[0];

    return <ProdutorEditContent produtor={produtor} />;
}

// Extraímos os hooks para um componente separado:
function ProdutorEditContent({ produtor }: { produtor: Produtores }) {
    const { mutate } = EditProdutor();
    const [nome, setNome] = useState(produtor.nome);
    const [telefone, setTelefone] = useState(produtor.telefone);
    const [municipio, setMunicipio] = useState(produtor.municipio);
    const [comunidade, setComunidade] = useState(produtor.comunidade);
    const [familiar, setFamiliar] = useState(produtor.familiar);
    const [estado, setEstado] = useState(produtor.estado);
    const [dataCadastro, setDataCadastro] = useState<Date | null>(null);
    const [successMessage, setSuccessMessage] = useState<boolean>(false);

    const submit = () => {
        mutate({
            id: produtor.id,
            nome,
            telefone,
            municipio,
            comunidade,
            familiar,
            estado,
            dataCadastro
        });

        setNome("");
        setTelefone("");
        setMunicipio("");
        setComunidade("");
        setFamiliar(false);
        setEstado("");
        setDataCadastro(null);

        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000);

        window.open("/Produtores/List", "_self");
    };

    return (
        <div id="produtores">
            <LatBar />
            <div id="work">
                <header className='d-flex flex-column w-100 justify-content-start header'>
                    <p id="titlleProd" className='w-100 h-100 m-0'>Editar Produtor</p>
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
    );
}
