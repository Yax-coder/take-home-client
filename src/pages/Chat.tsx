import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { Container, Stack } from 'react-bootstrap';
import { AuthContext } from "../context/AuthContext";;

const Chat = () => {
  // @ts-ignore
  const { user } = useContext(AuthContext)
  // @ts-ignore
  const { userChats, userChatsError, isUserChatsLoading } = useContext(ChatContext);

  return (
    <Container className="mt-5">
      {
        userChats?.length < 1 ? null : (
          <Stack direction="horizontal" gap={4} className="align-items-start">
            <Stack className="flex-grow-0 message-box pe-3" gap={3}>
              {isUserChatsLoading && <p>Loading Chats...</p>}
              {
                userChats?.map((chat, index) => {
                  return (
                    <div key={index}>
                      <UserChat chat={chat} user={user} />
                    </div>
                  )
                })
              }
            </Stack>
            <p>ChatBox</p>
          </Stack>
        )
      }
    </Container>
  )
}

export default Chat