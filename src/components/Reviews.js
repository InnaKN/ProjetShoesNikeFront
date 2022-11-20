import React, {useState,useEffect} from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';


  export default function Reviews({idShoe}) {
    const location = useLocation();
    const [shoeReviews, setShoeReviews] = useState([]);
    const [shoeTitle, setShoeTitle] = useState();
    useEffect(() => {
      const idShoe = location.state.idShoe;
      setShoeTitle(location.state.shoeTitle);
      axios.get("http://localhost:4002/api/reviews/"+idShoe)
            .then((response)=>{
              setShoeReviews(response.data);
              console.log('shoeReviews: ',response)
            });
   },[]);

  return (
        <div>
          <h2>Reviews of "<b>{shoeTitle}</b>"</h2>
          <div className="detail-reviews">
          {
                  shoeReviews.map((item, index)=>(
                      <div className="review-item" key={index}>
                        <div className="review-avatar"></div>
                        <div className="review-info">
                          <div className="review-item-title">{item.title} ({item.rating})</div>
                        <div className="review-item-description">{item.body}</div>
                        </div>
                      </div>
                  ))
                }
          </div>
        </div>    
  )
}

