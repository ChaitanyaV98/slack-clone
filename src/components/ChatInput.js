import { Button } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import { db, serverTimestamp } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function ChatInput({ channelName, channelId, chatRef }) {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault(); // prevents sending message during form refresh

    if (!channelId) {
      return false; // return false if channelId is not defined
    }

    const messagesCollectionRef = collection(
      db,
      "rooms",
      channelId,
      "messages"
    );
    await addDoc(messagesCollectionRef, {
      message: input,
      timestamp: serverTimestamp(),
      user: user.displayName,
      userImage: user.photoURL,
    });

    chatRef?.current?.scrollIntoView({
      behavior: "smooth",
    });

    // Clear the input field after sending the message
    setInput("");
  };
  return (
    <ChatInputContainer>
      <form>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={`Message #${channelName}`}
        />
        <Button hidden type="submit" onClick={sendMessage}>
          Send
        </Button>
      </form>
    </ChatInputContainer>
  );
}

export default ChatInput;

const ChatInputContainer = styled.div`
  border-radius: 20px;

  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border-radius: 3px;
    border: 1px solid gray;
    padding: 20px;
    outline: none;
  }
  > form > button {
    display: none !important;
  }
`;
