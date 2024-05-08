import { ReactNode, createContext, useEffect, useState } from "react";
import { getRequest, baseUrl, postRequest } from "../utils/services";
import { User } from "./AuthContext";

export const ChatContext = createContext({});

export const ChatContextProvider: React.FC<{ children: ReactNode, user: User }> = ({ children, user }) => {
    const [userChats, setUserChats] = useState();
    const [userChatsError, setUserChatsError] = useState(null)
    const [isUserChatsLoading, setIsUserChatsLoading] = useState<boolean>(false);
    const [potentialsChats, setPotentialChats] = useState([]);

    useEffect(() => {
        const getUsers = async () => {
            const response = await getRequest(`${baseUrl}/users`)

            if (response.error) {
                return console.log("Error fetching users", response);

            }
            let isChatCreated = false;
            const pChats = response.filter((u) => {
                if (user?._id === u._id) return false;
                if (userChats) {
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id
                    })
                }
                return !isChatCreated
            })
            setPotentialChats(pChats)
        }
        getUsers()
    }, [userChats])
    useEffect(() => {
        const getUserChats = async () => {
            setIsUserChatsLoading(true);
            setUserChatsError(null)
            const response = await getRequest(`${baseUrl}/chats/${user?._id}`)
            setUserChats(response)
            setIsUserChatsLoading(false);
            if (response.error) {
                return setUserChatsError(response)
            }
        }
        getUserChats()
    }, [user])


    return (
        <ChatContext.Provider value={{ userChats, userChatsError, isUserChatsLoading, potentialsChats }}>
            {children}
        </ChatContext.Provider>
    )
}
