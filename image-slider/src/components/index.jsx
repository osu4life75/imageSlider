import { useEffect, useState } from "react";
import {BsArrowLeftCircleFill, BsArrowRightCircleFill} from 'react-icons/bs'




export default function ImageSlider({ url, limit = 5, page = 1 }) {

    const [images, setImages]= useState([]);
    const [currentSlide, setCurrentSlide]= useState(0);
    const [errorMsg, setErrorMsg]= useState(0);
    const [loading, setLoading]= useState(false);

    async function fetchImages(getUrl){

        try {

            setLoading(true);

            const response = await fetch(`${getUrl}?page=${page}&limit=${limit}`);
            const data = await response.json();

            if(data){
                setImages(data);
                setLoading(false);
            }
            
        } catch (e) {
            setErrorMsg(e.message);
            setLoading(false);
            
        }

    }

    useEffect(() => {
        if (url !== "") fetchImages(url);
      }, [url]);
     
     console.log(images);

    if(loading){
        return <div>Loading data ! Please wait</div>
    }

    if (errorMsg !== null) {
        return <div>Error has occurred ! {errorMsg}</div>
        
    }



    
   
   
   
    return <div className="container">
       <BsArrowLeftCircleFill
        onClick={handlePrevious}
        className="arrow arrow-left"
      />
      {images && images.length
        ? images.map((imageItem, index) => (
            <img
              key={imageItem.id}
              alt={imageItem.download_url}
              src={imageItem.download_url}
              className={
                currentSlide === index
                  ? "current-image"
                  : "current-image hide-current-image"
              }
            />
          ))
        : null}
         </div>
};