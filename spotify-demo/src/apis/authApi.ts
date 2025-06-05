import axios from "axios";
import { ClientCredentialTokenResponse } from "../models/auth";
import { clientId, clientSecret } from "../configs/authConfig";

// const encodedBase64 = (data:string):string => {
//     if(typeof window !== "undefined") {
//         return btoa(data)
//     } else {
//         return Buffer.from(data).toString("base64");
//     }
// }

// const encodeBasicAuthHeader = (clientId: string, secretKey: string): string => {
//   return `Basic ${btoa(`${clientId}:${secretKey}`)}`;
// };

export const getClientCredentialToken = async():Promise<ClientCredentialTokenResponse> => {
    try {
        const body = new URLSearchParams({
            grant_type:"client_credentials",
        });
        const response = await axios.post("https://accounts.spotify.com/api/token",
            body,
            {
                headers:{
                    // "Authorization":`Basic ${encodedBase64(clientId + ':' + clientSecret)}`,
                    Authorization:"Basic " +Buffer.from(clientId + ':' + clientSecret).toString('base64'),
                    // "Authorization":"Basic " +(new Buffer.from(clientId + ':' + clientSecret).toString('base64')),
                    // Authorization: `Basic ${encodedBase64(
                    // `${clientId}:${clientSecret}`
                    // )}`,
                    "Content-Type":"application/x-www-form-urlencoded",
                },
            }
        );
        // console.log("eee" + response.data)

        return response.data;
    } catch(error) {
        throw new Error("Fail to fetch client credential token");
    }
}