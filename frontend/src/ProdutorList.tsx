import './style/App.css'
import './style/ProdutorList.css'
import Table from 'react-bootstrap/Table';

import { useProdutor } from './hooks/UseProdutor.ts';
import { ProdutorTable } from './components/Produtores/ProdutorTable.tsx';
import { LatBar } from './components/Misc/LatBar/LatBar.tsx';
import { useState } from 'react';
import { DropDownEstados } from './components/Misc/DropDownEstados/DropDownEstados.tsx';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; 


export function ProdutorList() {

  const [nome, setNome] = useState('');
  const [estado, setEstado] = useState('');
  const [municipio, setMunicipio] = useState('');
  
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
            <Table striped hover responsive className='w-100 h-100 m-0 text-nowrap tabel'>
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
                    produtor={produtor} 
                  />
                )}
              </tbody>
            </Table>
          </div>
        </main>
      </div>
    </div>

  )
}