import { useState } from "react";
import "./DropDownEstados.css"

interface DropDownEstadosProps {
  value: string;
  onChange: (estado: string) => void;
  placeholder?: string;
}

export function DropDownEstados({ value, onChange, placeholder }: DropDownEstadosProps) {
  const Estados = [
    '', 'ACRE', 'ALAGOAS', 'AMAPA', 'AMAZONAS', 'BAHIA', 'CEARA', 'DISTRITO_FEDERAL',
    'ESPIRITO_SANTO', 'GOIAS', 'MARANHAO', 'MATO_GROSSO', 'MATO_GROSSO_DO_SUL',
    'MINAS_GERAIS', 'PARA', 'PARAIBA', 'PARANA', 'PERNAMBUCO', 'PIAUI',
    'RIO_DE_JANEIRO', 'RIO_GRANDE_DO_NORTE', 'RIO_GRANDE_DO_SUL', 'RONDONIA',
    'RORAIMA', 'SANTA_CATARINA', 'SAO_PAULO', 'SERGIPE', 'TOCANTINS'
  ];

  const [open, setOpen] = useState(false);

  return (
    <div className='divDropdown d-flex flex-column align-items-start'>
      <button className="dropdown dropdown-toggle" type="button" onClick={() => setOpen(!open)}>
        {value || placeholder || 'Selecione o estado'}
      </button>

      <div className={`dropdown-menu ${open ? 'show' : ''}`}>
        {Estados.map((estado, i) => (
          <button
            key={i}
            className="dropdown-item"
            type="button"
            onClick={() => {
              onChange(estado);
              setOpen(false);
            }}
          >
            {estado}
          </button>
        ))}
      </div>
    </div>
  );
}
