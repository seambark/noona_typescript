import axios from "axios";
import { GetCategoriesRequest, GetCategoriesResponse } from "../models/search";
import { SPOTIFY_BASE_URL } from "../configs/commonConfig";

export const getCategories = async(
    token:string,
    params?:GetCategoriesRequest
):Promise<GetCategoriesResponse> => {
    try {
        const response = await axios.get(`${SPOTIFY_BASE_URL}/browse/categories`,{
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            params,
        });

        return response.data;
    } catch(error) {
        throw new Error("fail to categories");
    }
}