import { onAuthStateChanged } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { get, push, ref, set } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import back from '../../assets/back.png';
import plus from '../../assets/plus.png';
import { auth, database } from '../ChatRoom/firebase'; // Import database from local firebase.js
import './ListChatRoom.css';

const params = new URLSearchParams(window.location.search);
const uuid = params.get("param");

const ListChatrooms = () => {
  const [chatrooms, setChatrooms] = useState([]);
  const [user, setUser] = useState(null);
  const [newChatroomName, setNewChatroomName] = useState('');
  const [newChatroomDate, setNewChatroomDate] = useState('');
  const [isOpenNewChat, setIsOpenNewChat] = useState(false);
    

    const toggleNewChat = () => {
      setIsOpenNewChat(!isOpenNewChat);
    };

    const retourPagePrecedente = () => {
      window.history.back();
    };

  useEffect(() => {
    

    const fetchChatrooms = async () => {
      try {
        const chatroomsRef = ref(database, `chatrooms/${uuid}`);
        const snapshot = await get(chatroomsRef);
        const chatroomData = snapshot.val();
        if (chatroomData) {
          const chatroomList = Object.keys(chatroomData).map((key) => ({
            id: key,
            nom: chatroomData[key].nom
          }));
          setChatrooms(chatroomList);
        }
      } catch (error) {
        console.error('Error fetching chatrooms:', error);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    fetchChatrooms();
    
    // No cleanup required for Modular SDK
    return () => {
      unsubscribe();
    };
  }, [auth, database]);

  const generateLinkWithParam = (uuid, chatroomId) => {
    return `./messagerie?uuid=${uuid}&chatroomId=${chatroomId}`;
  };

  const handleAddMember = async (chatroomId) => {
    try {
      await addChatroomToUser(user.uid, chatroomId);
      console.log('User added to chatroom members.');
    } catch (error) {
      console.error('Error adding user to chatroom members:', error);
    }
  };

  const addChatroomToUser = async (userId, chatroomId) => {
    try {
      const userRef = ref(database, `users/${userId}/chatrooms`);
      const newUserroomRef = push(userRef); // Generate a new unique key for the chatroom
      set(newUserroomRef, {
        place_uuid: uuid,
        chatroomId: chatroomId
      }).then(() => {
        console.log('Chatroom data inserted successfully.');
      }).catch((error) => {
        console.error('Error inserting chatroom data:', error);
      });

      // Update chatroom as well
      const chatroomRef = ref(database, `chatrooms/${uuid}/${chatroomId}/members`);
      await set(chatroomRef, { [userId]: true });

      console.log('Chatroom added to user node and user added to chatroom in the database.');
    } catch (error) {
      console.error('Error adding chatroom to user node or adding user to chatroom:', error);
    }
  };

  const handleCreateChatroom = async (e) => {
    e.preventDefault();
    if (newChatroomName.trim() !== '' && newChatroomDate.trim() !== '') {
      // Generate a unique chatroom ID
      const newChatroomId = `chatroom_${Date.now()}`;
      const chatroomRef = ref(database, `chatrooms/${uuid}/${newChatroomId}`);
      await set(chatroomRef, {
        nom: newChatroomName.trim(),
        date: newChatroomDate.trim()
      });
      await addChatroomToUser(user.uid, newChatroomId);
      console.log('Chatroom created successfully.');
      // Update the chatrooms state with the new chatroom
    setChatrooms(prevChatrooms => [...prevChatrooms, { id: newChatroomId, nom: newChatroomName.trim() }]);
    }
  };

  const handleNewChatroomNameChange = (e) => {
    setNewChatroomName(e.target.value);
  };

  const handleNewChatroomDateChange = (e) => {
    setNewChatroomDate(e.target.value);
  };
  
  return (
    <div className='list-div'>
      <button onClick={retourPagePrecedente} className='back'>
      <img src={back} alt='retourner en haut de page'  width={15} height={15}/>  Retourner à la page précédente
    </button>
      <h2>Liste des salons disponibles</h2>
      <button className="NewChat-button" onClick={toggleNewChat}>
                <img src={plus} alt="bouton pour modifier les paramétre d'accessibilité" width={65} height={65} />
            </button>
            <Modal
                isOpen={isOpenNewChat}
                onRequestClose={toggleNewChat}
                contentLabel="Accessibility Options"
                className="modal"
                overlayClassName="overlay"
            >
      {user && (
        <form onSubmit={handleCreateChatroom}>
          <h3>Create a New Chatroom</h3>
          <label>
            Chatroom Name:
            <input type="text" value={newChatroomName} onChange={handleNewChatroomNameChange} />
          </label>
          <label>
            Date:
            <input type="date" value={newChatroomDate} onChange={handleNewChatroomDateChange} />
          </label>
          <button type="submit">Create Chatroom</button>
        </form>
      )}
      </Modal>
      <ul>
      {chatrooms.map((chatroom) => (
      <li key={chatroom.id}>
        {user && (
          <a className="list" href={generateLinkWithParam(uuid, chatroom.id)} >
            {chatroom.nom}
            <button onClick={() => handleAddMember(chatroom.id)}>Rejoindre</button>
          </a>
        )}
      </li>
      ))}
      </ul>
      
    </div>
  );
};

export default ListChatrooms;