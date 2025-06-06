import './style/App.css'
import './style/ProdutorList.css'
import Table from 'react-bootstrap/Table';

import { useProdutor } from './hooks/UseProdutor.ts';
import { LatBar } from './components/Misc/LatBar/LatBar.tsx';
import { useState } from 'react';
import { DropDownEstados } from './components/Misc/DropDownEstados/DropDownEstados.tsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 
import { Produtores } from './interface/Produtores.ts';

export function ProdutorList() {

  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [selectedId, setSelectedId] = useState<number | null>(null); // estado para selecionado

  const { data } = useProdutor(nome, estado, municipio);

  return (
    <div id='produtores'>

    <LatBar/>

      <div id="work"> 
        <header className='d-flex flex-column w-100 h-40 bg-light justify-content-start'>
          <p id = "titlleProd" className='w-100 h-50 m-0'>Produtores</p>
          
          <nav className='w-100 h-80 d-flex flex-column gap-2'>
            <div>
              <p className='m-0'>Filtros</p>
            </div>

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
          <div className='tabelDiv'>
            <div className='tabela'>
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
            </div>
          </div>
        </main>
      </div>
    </div>

  )

  function ProdutorTable({produtor, selected, onSelect,}: 
    {
      produtor: Produtores;
      selected: boolean;
      onSelect: () => void;
    }) 
    {
      return (
        <tr
          onClick={onSelect}
          className={selected ? 'selected-row' : ''}
          style={{
            cursor: 'pointer',
          }}>

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
    setSelectedId(prevId => (prevId === id ? null : id));
  }
}