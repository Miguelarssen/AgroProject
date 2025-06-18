import './style/App.css';
import './style/ProdutorList.css';
import './style/index.css'; // Tailwind import

import { useProdutor } from './hooks/UseProdutor.ts';
import { LatBar } from './components/Misc/LatBar/LatBar.tsx';
import { useState, useEffect } from 'react';
import { DropDownEstados } from './components/Misc/DropDownEstados/DropDownEstados.tsx';
import { Produtores } from './interface/Produtores.ts';
import { DeleteProdutor } from "./hooks/DeleteProdutor.ts";

import edit from "./assets/edit.png";
import del from "./assets/bin.png";


import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

export function ProdutorList() {

  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [editVisible, setEditVisible] = useState(false);

  const { mutate } = DeleteProdutor()
  const { data } = useProdutor(nome, estado, municipio);

  const deleteProdutor = () => {
    if (selectedId !== null) {
      mutate(selectedId);
    } else {
      console.warn("Nenhum produtor selecionado para deletar");
    }
  }

  function ProdutorTable({ produtor, selected, onSelect }:
    {
      produtor: Produtores;
      selected: boolean;
      onSelect: () => void;
    }) {
    return (
      <tr
        onClick={onSelect}
        className={selected ? 'selected-row' : ''}
        style={{ cursor: 'pointer' }}
      >
        <td className="text-truncate">{produtor.nome}</td>
        <td className="text-truncate">{produtor.telefone}</td>
        <td className="text-truncate">{produtor.municipio}</td>
        <td className="text-truncate">{produtor.comunidade}</td>
        <td className="text-truncate">{produtor.familiar}</td>
        <td className="text-truncate">{produtor.estado}</td>
      </tr>
    );
  }

  function selectLine(id: number) {
    if (selectedId === id) {
      setSelectedId(null);
      setEditVisible(false);
    } else {
      setSelectedId(id);
      setEditVisible(true);
    }
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!data || data.length === 0) return;

      const currentIndex = data.findIndex(p => p.id === selectedId);

      if (e.key === 'ArrowDown') {
        e.preventDefault();

        let nextIndex;
        if (currentIndex < data.length - 1 && currentIndex !== -1) {
          nextIndex = currentIndex + 1;
        } else {
          nextIndex = 0;
        }

        const nextProdutor = data[nextIndex];
        setSelectedId(nextProdutor.id);
        setEditVisible(true);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();

        let prevIndex;
        if (currentIndex > 0) {
          prevIndex = currentIndex - 1;
        } else {
          prevIndex = data.length - 1;
        }

        const prevProdutor = data[prevIndex];
        setSelectedId(prevProdutor.id);
        setEditVisible(true);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [data, selectedId]);


  return (
    <div id='produtores'>
      <LatBar />

      <div id="work">
        <header className='d-flex flex-column w-100 h-40 bg-light justify-content-start'>
          <p id="titlleProd" className='w-100 h-50 m-0'>Lista de Produtores</p>

          <nav className='w-100 h-80 d-flex flex-column gap-2'>
            <form className='d-flex justify-content-start px-3'>
              <div className='d-flex flex-row gap-3'>
                <input
                  type='text'
                  placeholder='Filtrar por nome'
                  className='form-control input'
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <input
                  type='text'
                  placeholder='Filtrar por município'
                  className='form-control input'
                  value={municipio}
                  onChange={(e) => setMunicipio(e.target.value)}
                />
                <DropDownEstados value={estado} onChange={setEstado} placeholder="Filtrar por estado" />
              </div>
            </form>
          </nav>
        </header>

        <main className='d-flex flex-grow-1 flex-column justify-content-end'>
          <div className='d-flex flex-row'>
            <button 
              className={`bg-blue-500 hover:bg-emerald-500 ease-in-out duration-500 hover:scale-105 text-white font-bold rounded buttonEdit ${editVisible ? "show" : ""}`}
              onClick={() => window.open("/Produtores/Edit/"+selectedId, "_self")}
              >
              Editar <img className="d-flex editImg" src={edit} />
            </button>

            <button 
              className={`bg-red-500 hover:bg-red-700 ease-in-out duration-500 hover:scale-105 text-white font-bold rounded buttonEdit ${editVisible ? "show" : ""}`}
              onClick={deleteProdutor}
              >
              Deletar <img className="d-flex editImg" src={del} />
            </button>
          </div>
          <div className='tabelDiv'>
            <table className='tabela'>
              <thead>
                <tr>
                  <th className="text-truncate">Nome</th>
                  <th className="text-truncate">Telefone</th>
                  <th className="text-truncate">Município</th>
                  <th className="text-truncate">Comunidade</th>
                  <th className="text-truncate">Familiar</th>
                  <th className="text-truncate">Estado</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((produtor) =>
                  <ProdutorTable
                    key={produtor.id}
                    produtor={produtor}
                    selected={produtor.id === selectedId}
                    onSelect={() => selectLine(produtor.id)}
                  />
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
    </div>
  )
}
