import { get, onValue, push, ref } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { useEffect, useState } from 'react';
import './ChatRoom.css';
import { auth, database } from './firebase'; // Import database from local firebase.js

const params = new URLSearchParams(window.location.search);
const uuid = params.get("uuid");
const chatroomId = params.get("chatroomId");

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [userFullNameMap, setUserFullNameMap] = useState({});

  useEffect(() => {
    const messagesRef = ref(database, `chatrooms/${uuid}/${chatroomId}/messages`);

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const messagesArray = Object.entries(data).map(([id, message]) => ({
          id,
          text: message.text,
          senderId: message.senderId,
        }));
        setMessages(messagesArray);
      } else {
        setMessages([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [uuid, chatroomId]); // Dependency array is empty, so this effect should only run once
  useEffect(() => {
    const fetchSenderFullNames = async () => {
      try {
        const uniqueSenderIds = Array.from(new Set(messages.map(message => message.senderId)));

        // Fetch full names of senders
        const senderFullNameMap = {};
        await Promise.all(
          uniqueSenderIds.map(async (senderId) => {
            const userRef = ref(database, `users/${senderId}`);
            const snapshot = await get(userRef);
            const userData = snapshot.val();
            if (userData) {
              console.log(userData);
              senderFullNameMap[senderId] = `${userData.lastName} ${userData.name}`;
            }
          })
        );

        setUserFullNameMap(senderFullNameMap);
      } catch (error) {
        console.error('Error fetching sender full names:', error);
      }
    };

    fetchSenderFullNames();
  }, [messages]);
  const handleMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() !== '') {
      const user = auth.currentUser;
      if (user) {
        const messageData = {
          text: newMessage.trim(),
          senderId: user.uid, // Use current user's UID as sender ID
          timestamp: Date.now(),
        };
        const roomRef = ref(database, `chatrooms/${uuid}/${chatroomId}/messages`);
        try {
          await push(roomRef, messageData);
          setNewMessage('');
        } catch (error) {
          console.error('Error sending message:', error);
        }
      } else {
        console.error('No user logged in.');
      }
    }
  };

  return (
    <div className="chat-room">

      <div className="message-container">
        {messages.map((message) => (
          <div key={message.id} className="message">
            <p>{userFullNameMap[message.senderId]}</p>

            <p>{message.text}</p>
          </div>
        ))}
      </div>
      <div className="message-input">
        <textarea
          value={newMessage}
          className="input-message"
          onChange={handleMessageChange}
          placeholder="Type your message here..."
        ></textarea>
        <button className='send' onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;