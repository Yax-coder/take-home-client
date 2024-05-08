import { useEffect, useState } from "react";
import { User } from "../context/AuthContext";
import { baseUrl, getRequest } from "../utils/services";

export const useFetchRecipientUser = (chat: any, user: User) => {
    const [recipientUser, setRecipientUser] = useState(null);
    const [error, setError] = useState(null);
    // @ts-expect-error
    const recipientId = chat?.members.find((id) => id !== user?._id);

    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) return null;

            const response = await getRequest(`${baseUrl}/users/find/${recipientId}`);

            if (response.error) {
                return setError(response)
            }
            setRecipientUser(response)
        }
        getUser();
    }, [])


    return { recipientUser, error }

}