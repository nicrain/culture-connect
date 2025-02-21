import { get, ref } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { useEffect, useState } from 'react';
import { auth, database } from '../ChatRoom/firebase';
import './SalonUsers.css';


const SalonsUsers = () => {
  const params = new URLSearchParams(window.location.search);
  const uuid = params.get("param");
  const [chatrooms, setChatrooms] = useState([]);
  const [error, setError] = useState(null);

  const generateLinkWithParam = (uuid, chatroomId) => {
    return `./messagerie?uuid=${uuid}&chatroomId=${chatroomId}`;
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const fetchUserChatrooms = async () => {
          const userId = user.uid;
          const userChatroomsRef = ref(database, `users/${userId}/chatrooms`);
          try {
            const snapshot = await get(userChatroomsRef);
            const userChatrooms = snapshot.val();

            if (userChatrooms) {
              const chatroomList = Object.keys(userChatrooms).map((key) => ({
                place_uuid: userChatrooms[key].place_uuid,
                chatroomId: userChatrooms[key].chatroomId
              }));

              const chatroomNamesPromises = chatroomList.map(async (chatroom) => {
                const { place_uuid, chatroomId } = chatroom;
                const chatroomRef = ref(database, `chatrooms/${place_uuid}/${chatroomId}/nom`);
                const snapshot = await get(chatroomRef);
                const nom = snapshot.val();
                return { ...chatroom, name: nom };
              });

              const chatroomNames = await Promise.all(chatroomNamesPromises);
              setChatrooms(chatroomNames);
            } else {
              setChatrooms([]);
            }
          } catch (error) {
            console.error("Error fetching chatrooms: ", error);
            setError(error.message);
          }
        };

        fetchUserChatrooms();
      }
    });

    return () => unsubscribe();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='list-div'>
      <h2>Vos salons de discussions</h2>
      <ul>
        {chatrooms.map((chatroom) => (
          <li key={`${chatroom.place_uuid}-${chatroom.chatroomId}`}>
            <a className='list' href={generateLinkWithParam(chatroom.place_uuid, chatroom.chatroomId)}>{chatroom.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SalonsUsers;