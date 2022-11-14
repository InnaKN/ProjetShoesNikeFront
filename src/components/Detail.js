import React, {useState,useEffect} from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormLabel from '@mui/material/FormLabel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import Carousel from 'react-bootstrap/Carousel';
import { useLocation } from "react-router-dom";




export default function Detail() {
  const location = useLocation();
  const [shoe, setShoe] = useState()
  useEffect(() => {
    const idShoe = location.state.idShoe;
    axios.get("http://localhost:4002/api/shoes/"+idShoe)
          .then((response)=>{
            setShoe(response.data)    
            console.log('dataDETAILS: ',response)
          });
 },[]);
  

  return (
    <>
      {
        shoe?(
<div className="detail-container">  
          <div className="detail-main">
            <div className="detail-image-carousel">
              <Carousel variant="dark">
{
            shoe.variations.map((item, index)=>(
            
              <Carousel.Item  key={index}>
                <img
                  className="detail-image"
                  src={item.img_links[0]}
                  alt="img-var"
                />
                <Carousel.Caption>
                  <h5>{item.sku}</h5>
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
              <div className="detail-color-picker">

              </div>
            </div>
          </div>
          <div className="detail-description">
DETAIL
          </div>
          <div className="detail-reviews">
REVIEWS
          </div>
        </div>
        ):(
<div className="detail-container">NOT FOUND</div>
        )
      }
      
    </>
    
        
  )
}
