import { InfoOutlined, StarBorderOutlined } from "@mui/icons-material";
import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { selectRoomId } from "../features/appSlice";
import ChatInput from "./ChatInput";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { collection, doc, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import Message from "./Message.js";

function Chat() {
  const chatRef = useRef(null);
  const roomId = useSelector(selectRoomId);
  //   const roomDetails = useDocument(roomId && collection(db, "rooms"));
  const roomRef = roomId && doc(db, "rooms", roomId);
  const [roomDetails] = useDocument(roomRef);

  const messagesQuery =
    roomId &&
    query(
      collection(db, "rooms", roomId, "messages"),
      orderBy("timestamp", "asc")
    );
  const [roomMessages, loading] = useCollection(messagesQuery);
  //console.log("roomMessage", roomMessages);

  //console.log("Room Detailss--->>", roomDetails?.data());

  useEffect(() => {
    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    }); // keeps the view with the latest messages
  }, [roomId, loading]);
  return (
    <ChatContainer>
      {roomDetails && roomMessages ? (
        <>
          <Header>
            <HeaderLeft>
              <h4>
                <strong>{roomDetails?.data().name} Channel</strong>
                <StarBorderOutlined />
              </h4>
            </HeaderLeft>
            <HeaderRight>
              <p>
                <InfoOutlined /> Details
              </p>
            </HeaderRight>
          </Header>
          <ChatMessages>
            {/*List of all messages */}
            {roomMessages?.docs.map((doc) => {
              const { message, timestamp, user, userImage } = doc?.data();
              return (
                <Message
                  key={doc.id}
                  message={message}
                  timestamp={timestamp}
                  user={user}
                  userImage={userImage}
                />
              );
            })}
            <ChatBottom ref={chatRef} />{" "}
            {/*empty comp To show the last items behind the input while scrolling */}
          </ChatMessages>
          <ChatInput
            channelName={roomDetails?.data().name}
            channelId={roomId}
            chatRef={chatRef}
          />
        </>
      ) : null}
    </ChatContainer>
  );
}

export default Chat;

const ChatBottom = styled.div`
  padding-bottom: 200px;
`;

const ChatContainer = styled.div`
  flex: 0.7;
  flex-grow: 1; //This overrides the flex-grow value set by the shorthand flex: 0.7;. It allows the ChatContainer to grow and take up any available space within its flex container.
  overflow-y: scroll;
  margin-top: 60px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  border-bottom: 1px solid lightgray;
`;

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  > h4 {
    display: flex;
    text-transform: lowercase;
    margin-right: 10px;
  }
  > h4 > .MuiSvgIcon-root {
    margin-left: 10px;
    font-size: 18px;
  }
`;
const HeaderRight = styled.div`
  > p {
    display: flex;
    align-items: center;
    font-size: 14px;
  }
  > p > .MuiSvgIcon-root {
    margin-right: 5px !important;
    font-size: 16px;
  }
`;

const ChatMessages = styled.div``;
