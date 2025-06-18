import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const API_URL = 'http://localhost:8080';

const deleteData = async (id: number) => {
  return axios.delete(`${API_URL}/produtores`, {
    data: { id }
  });
};

export function DeleteProdutor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      // Invalida e refaz a requisição da lista de produtores
      queryClient.invalidateQueries({ queryKey: ['produtores'] });
    }
  });
}
