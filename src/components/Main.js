import React, {useState,useEffect} from 'react'
import Container from 'react-bootstrap/Container';

import axios from 'axios';
import {useNavigate} from "react-router-dom";

  export default function Main() {

    let navigation = useNavigate();
    const [shoesList, setShoesList] = useState([])
    const [pageNumber, setPageNumber] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(1)

    useEffect(() => {
      axios.get("http://localhost:4002/api/shoes/?pageNumber="+pageNumber)
          .then((response)=>{
            setShoesList(response.data.shoes);
            setTotalPages(response.data.count);
            setItemsPerPage(response.data.itemsPerPage)
            console.log('data: ',response)
          });
   },[pageNumber]);
    


  return (
        <Container>
          
            <h2>ShoeMatcher</h2>
            <input type="search"></input>
            <div style={{ display: shoesList.length >0? 'block': 'none'}}  >
              <div className="paginator">
              {(() => {
                let pagerItems = [];
                for (let i = 1; i <= totalPages/itemsPerPage; i++) {
                  pagerItems.push(<div key={i} className={pageNumber===i?'pager-item active':'pager-item'} onClick={() => {setPageNumber(i)}}>{i}</div>);
                }
                return pagerItems;
              })()}
              </div>
              {
                shoesList.map((item, index)=>(
                  <div className="list-item-container" key={index} onClick={() => {navigation('/shoe-detail', { state:{idShoe: item._id} })}}>
                    <div className="list-image">
                      <img src={item.variations[0].img_links[0]} alt="img variation 1"/>
                    </div>
                    <div className="list-description">
                      <div className="list-title">
                        {item.title}
                      </div>
                      <div className="list-description">
                        {item.description}
                      </div>
                      <div className="list-description-images">
                        {item.variations.map((itemVariation, indexVariation)=>(
                          <img key={indexVariation} src={itemVariation.img_links[0]} alt="img_variation"/>
                        ))}
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
            <div className="paginator">
              {(() => {
                let pagerItems = [];
                for (let i = 1; i <= totalPages/itemsPerPage; i++) {
                  pagerItems.push(<div key={i} className={pageNumber===i?'pager-item active':'pager-item'} onClick={() => {setPageNumber(i)}}>{i}</div>);
                }
                return pagerItems;
              })()}
              </div>
            <div style={{backgroundColor: 'red', display: shoesList.length ===0 ? 'block': 'none'}}>No Shoes found</div>

        </Container>    
  )
}
