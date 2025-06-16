import { useQuery } from "@tanstack/react-query";
import useClientCredentialToken from "./useClientCredentialToken";
import { getCategories } from "../apis/categoriesApi";
import { GetCategoriesRequest, GetCategoriesResponse } from "../models/search";

const useGetCategories = (params?:GetCategoriesRequest) => {
    const clientCredentialToken = useClientCredentialToken();
    
    return useQuery<GetCategoriesResponse>({
        queryKey:["categories-list", params],
        queryFn:() => getCategories(clientCredentialToken!, params),
        enabled: !!clientCredentialToken,
    });
    
}

export default useGetCategories;