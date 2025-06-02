import { Produtores } from '../../interface/Produtores.ts'

export interface produtorTableProp{
    produtor: Produtores
}

export function ProdutorTable({produtor}: produtorTableProp){
    return(
        <tr>
            <td className="text-truncate">{produtor.nome}</td>
            <td className="text-truncate">{produtor.telefone}</td>
            <td className="text-truncate">{produtor.municipio}</td>
            <td className="text-truncate">{produtor.comunidade}</td>
            <td className="text-truncate">{produtor.familiar}</td>
            <td className="text-truncate">{produtor.estado}</td>
        </tr>
    )
}   