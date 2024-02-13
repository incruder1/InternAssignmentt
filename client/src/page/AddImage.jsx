import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/auth';
import "./AddImage.css";
import Header from '../component/header';
function AddImage() {
  const storedData = localStorage.getItem("auth");
    const email = JSON.parse(storedData).user.email;
    // console.log(email);
    // Parse the JSON string into a JavaScript object
    const authData = JSON.parse(storedData);

    const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleImageUpload = async () => {
    const formData = new FormData();
    formData.append('image', image);
    formData.append('email', email);

    try {
      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });
      console.log(response);
      if (response.ok) {
        console.log('Image uploaded successfully!');
        // Handle any additional logic after successful upload
      } else {
        console.error('Error uploading image');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };
  
 
  //const [images, setImages] = useState([]);
  const [usersWithImages, setUsersWithImages] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        // Make a request to your Express server's /images endpoint
        const response = await axios.get('http://localhost:8080/images'); // Update the URL
        // setImages(response.data+"-------------------");
        console.log(response);
        setUsersWithImages(response.data.filter((user) => user.uploadedImages.length > 0));
      } catch (error) {
        console.error('Error fetching images:', error.message);
      }
    };

    fetchImages();
  }, []);

  return (
    <>
    <Header/>
    <div className='image-Input'>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <button className='image-input-button' onClick={handleImageUpload}>Upload Image</button>

      <div className="images-container">
      <h2>Images Page</h2>
      {usersWithImages.map((user) => (
        
        <div key={user.__id} className="user-images" >
           <ul>
            {user.uploadedImages.map((image) => (
              <li key={image.timestamp} className="image-item">
                <img src={image.imageUrl} alt="Uploaded" className="image" />
               
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    </div>
      </>
  );
};


export default AddImage;
