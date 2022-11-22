
import axios from "axios";
import {
    useQuery,
} from "@tanstack/react-query";

export const useListDocuments = () => {
    return useQuery({
        queryKey: ["listdocuments"],
        queryFn: async () => {
            const { data } = await axios.get("https://google.com/documents",

                {
                    headers: {
                        "Content-Type": "aplication/json",
                        Authorization: "Bearer " + TOKEN
                    }
                })
            return data
        }
    })
}