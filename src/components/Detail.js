import React, {useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation } from "react-router-dom";
import {useNavigate} from "react-router-dom";




export default function Detail() {
  let navigation = useNavigate();
  const location = useLocation();
  const [shoe, setShoe] = useState();
  const [variationSelected, setVariationSelected] = useState();
  useEffect(() => {
    const idShoe = location.state.idShoe;
    axios.get("http://localhost:4002/api/shoes/"+idShoe)
          .then((response)=>{
            setShoe(response.data);
            setVariationSelected(response.data.variations[0]);
            console.log('dataDETAILS: ',response)
          });
 },[]);
  
 const calculateRatingPersentage=()=>{
  const sommeRatings = shoe.reviews.reduce((somme,currentItem)=>somme+currentItem.rating,0);
  const average = sommeRatings/shoe.review_count;
  const percent= average*100/5;
  return sommeRatings===0?'0%':percent + "%";
 }

  return (
    <>
      {
        shoe?(
          <div className="detail-container">  
              <div className="detai-variations">
                {
                  shoe.variations.map((item, index)=>(
                      <img 
                        onClick={() => {setVariationSelected(item)}}
                        className={item.sku===variationSelected.sku?'selected':''}
                        key={index}
                        src={item.img_links[0]}
                        alt="img-var"
                      />
                  ))
                }
              </div>
              <div className="detail-main">
                <div className="detail-image-carousel">
                  <Carousel variant="dark">
                    {
                      variationSelected.img_links.map((item, index)=>(
                        <Carousel.Item  key={index}>
                          <img
                            className="detail-image"
                            src={item}
                            alt="img-var"
                          />
                          <Carousel.Caption>
                            <h5>{variationSelected.sku}</h5>
                          </Carousel.Caption>
                        </Carousel.Item>
                      ))
                    }
                  </Carousel>
                </div>
              <div className="detail-choises">
                <h3>
                  {shoe?.title}
                </h3>
                <br/>
                <div className="color-title">Start with your size or your color</div>
                <div className="detail-color-picker">
                  
                  {
                    variationSelected.color.split('/').map((item, index)=>(
                      <div key={index}>
                        {item}
                      </div>
                  ))
                  }
                </div>
                <br/>
                <div className="size-title">Choose your size</div>
                <div className="detail-size-picker">
                  
                  {
                    variationSelected.sizes_available.map((item, index)=>(
                      <div key={index}>
                        {item}
                      </div>
                  ))
                  }
                </div>
                <div className="detail-prix">Prix:  {variationSelected.price}</div>
              </div>
            </div>
            <div className="detail-title">Description</div>
          <div className="detail-description">
          
            <p>{shoe.description}</p>
          </div>
          <div className="reviews-title">
            Reviews({shoe.reviews.length}) 
            <div className="star-ratings">
              <div className="fill-ratings" style={{width:calculateRatingPersentage()}}>
                  <span>★★★★★</span>
              </div>
              <div className="empty-ratings">
                  <span>★★★★★</span>
              </div>
            </div>                                                                                                                              
            <Button variant="secondary" size="sm" onClick={() => {navigation('/shoe-reviews', { state:{idShoe: shoe._id, shoeTitle:shoe.title} })}}>View all</Button>
          </div>
          <div className="detail-reviews">
          {
                  shoe.reviews.slice(0, 3).map((item, index)=>(
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
        :(<div className="detail-container">NOT FOUND</div>)
      }
      
    </>
    
        
  )
}
