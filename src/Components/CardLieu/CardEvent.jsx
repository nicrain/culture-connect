// CustomLink.js
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-app.js';
import { getAuth } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-auth.js';
import { get, getDatabase, ref } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-database.js';
import { getStorage } from 'https://www.gstatic.com/firebasejs/9.6.3/firebase-storage.js';
import React, { useEffect, useState } from 'react';

const firebaseConfig = {
  apiKey: "AIzaSyDrUZ7SdmGYarxvIN7ikrUr5AzKeDIScW8",
  authDomain: "cultureapp-a1c9c.firebaseapp.com",
  databaseURL: "https://cultureapp-a1c9c-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cultureapp-a1c9c",
  storageBucket: "cultureapp-a1c9c.appspot.com",
  messagingSenderId: "885088600367",
  appId: "1:885088600367:web:2b5d6f33e92435849fe1da",
  measurementId: "G-PQ7DPJJJFT"
}


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

const CardEvent = ({ url, text, lieuID }) => {
  console.log(lieuID);
  const [small_description, setSmall_Description] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const image = imageUrl;

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const imageRef = ref(database, 'evenement/' + lieuID + '/images/image1');
        const imageSnapshot = await get(imageRef);
        const img = imageSnapshot.val();
        setImageUrl(img);
      } catch (error) {
        console.error('Error getting image:', error);
      }
    }
    const fetchSmall_description = async () => {
      try {
        const small_despRef = ref(database, 'evenement/' + lieuID + '/small_description');
        const Small_despSnapshot = await get(small_despRef);
        const small_desp = Small_despSnapshot.val();
        setSmall_Description(small_desp);
      } catch (error) {
        console.error('Error getting image:', error);
      }
    }
    fetchImage();
    fetchSmall_description();

  }, [database]);

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {text}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {small_description}
        </Typography>
      </CardContent>
      <CardActions>

        <Button size="small"><a href={url}>
          Voir Plus
        </a></Button>
      </CardActions>
    </Card>

  );
};

export default CardEvent;
