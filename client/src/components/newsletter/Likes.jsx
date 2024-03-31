import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { toast } from "wc-toast";



function Likes({ data, email, mainId, date }) {
  const id = data._id;

  const token = Cookies.get("token");
  axios.defaults.headers["x-access-token"] = token;

  const [isLiked, setIsLiked] = useState(false);
  const [count, setCount] = useState(null);

  useEffect(() => {
    const checkLiked = async () => {
      try {
        const respone = await axios.get(
          `newsletter/check-like/${data._id}?email=${email}&mainId=${mainId}`
        );
        console.log(respone);
        setIsLiked(respone.data.liked);
        setCount(respone.data.count);
      } catch (error) {
        console.error("Error checking like:", error);
      }
    };
    checkLiked();
  }, []);

  const handleLike = async () => {
    try {
      // Update UI immediately
      setIsLiked(!isLiked); // Toggle like status
      setCount(count + (isLiked ? -1 : 1)); // Increment or decrement count

      // Make API call in background
      await axios.patch(
        `newsletter/like/${data._id}`,
        { email, liked: !isLiked, mainId }
      );
    } catch (error) {
      console.error("Error toggling like:", error);
      // Handle error and revert UI changes if necessary
    }
  };

  return (
    <div id="likes">
      <i type="button" onClick={() => {navigator.clipboard.writeText(`http://localhost:5173/newsletter/${date}#${id}`);toast.success('Copied to Clipboard')}} className="bi bi-share-fill" style={{color: 'blue'}}></i>
      &nbsp;&nbsp;&nbsp;&nbsp;
      <i
        type="button"
        className={`bi bi-heart${isLiked ? "-fill" : ""} text-danger`}
        onClick={handleLike}
      ></i> {count} 
      {/* {count <= 1 ? 'Like':'Likes'} */}
    </div>
  );
}

export default Likes;
