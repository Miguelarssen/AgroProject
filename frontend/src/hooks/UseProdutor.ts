import axios, { AxiosPromise } from "axios";
import { Produtores } from "../interface/Produtores";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const fetchData = async (nome?: string, estado?: string, municipio?: string): AxiosPromise<Produtores[]> => {
  const params = new URLSearchParams();

  if (nome) params.append("nome", nome);
  if (estado) params.append("estado", estado);
  if (municipio) params.append("municipio", municipio);

  const response = await axios.get(API_URL + "/produtores", { params });
  return response;
};

export function useProdutor(nome?: string, estado?: string, municipio?: string) {
  const query = useQuery({
    queryFn: () => fetchData(nome, estado, municipio),
    queryKey: ['produtores', nome, estado, municipio], 
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
