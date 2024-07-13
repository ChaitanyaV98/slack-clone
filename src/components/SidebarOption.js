import React from "react";
import styled from "styled-components";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { enterRoom } from "../features/appSlice";

function SidebarOption({ Icon, title, addChannelOption, id }) {
  const dispatch = useDispatch();
  const addChannel = async () => {
    const channelName = prompt("Please enter the channel name");

    if (channelName) {
      try {
        await addDoc(collection(db, "rooms"), {
          name: channelName,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  };
  const selectChannel = () => {
    //here is where we wanna use the redux
    //whenever the user uses the room or a channel, then we wanna push the room to the redux

    if (id) {
      dispatch(
        enterRoom({
          roomId: id,
        })
      );
    }
  };
  return (
    <SidebarOptionContainer
      onClick={addChannelOption ? addChannel : selectChannel}
    >
      {Icon ? <Icon fontSize="small" style={{ padding: 10 }} /> : null}
      {Icon ? (
        <h3>{title}</h3>
      ) : (
        <SidebarOptionChannel>
          <span>#</span> {title}
        </SidebarOptionChannel>
      )}
    </SidebarOptionContainer>
  );
}

export default SidebarOption;

const SidebarOptionContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  padding-left: 2px;
  cursor: pointer;
  :hover {
    opacity: 0.9;
    background-color: #340e36;
  }
  > h3 {
    font-weight: 500;
  }
  > h3 > span {
    padding: 15px;
    font-weight: 300;
  }
`;

const SidebarOptionChannel = styled.h3`
  padding: 10px 0;
`;
