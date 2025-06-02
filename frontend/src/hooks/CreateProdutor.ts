import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios"
import { Produtores } from '../interface/Produtores';

const API_URL = 'http://localhost:8080';

const postData = async (data: Produtores): AxiosPromise<any> => {
    const response = axios.post(API_URL + '/produtores', data);
    return response;
}

export function CreateProdutor(){

    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn: postData,
        retry: 2,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Produtores"] });
        }

    })

    return mutate;
}