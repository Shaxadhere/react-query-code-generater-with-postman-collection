
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
export const useCreateDocument = () => {
    return useQuery({
        queryKey: ["createdocument"],
        queryFn: async () => {
            const { data } = await axios.post("https://google.com/document",
                {
                    title: "Im a title",
                    description: "Im a description",
                },
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