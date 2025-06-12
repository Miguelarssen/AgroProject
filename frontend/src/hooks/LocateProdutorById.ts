import axios, { AxiosPromise } from "axios";
import { Produtores } from "../interface/Produtores";
import { useQuery } from "@tanstack/react-query";

const API_URL = "http://localhost:8080";

const fetchData = async (id?: number): AxiosPromise<Produtores[]> => {
  const params = new URLSearchParams();

  if (id) params.append("id", id.toString());

  const response = await axios.get(API_URL + "/produtores", { params });
  return response;
};
export function locateProdutorById(id?: number) {
  const query = useQuery({
    queryFn: () => fetchData(id),
    queryKey: ['produtores',id], 
    retry: 2,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
