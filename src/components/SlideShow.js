import React, { useState } from "react";
import {GrFormNext , GrFormPrevious} from "react-icons/gr";

// Im using this component for my image slideshow that ive used inside of the searched hotel card and selected hotel modal
const SlideShow = ({ images }) => {
  // here im managing my local state to keep track of the current index
  const [currentIndex, setCurrentIndex] = useState(0);

  
  const nextImage = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="slideshow">
      <GrFormPrevious onClick={prevImage} className="slideshow-previous"/>
      <img src={images[currentIndex]} alt="Hotel" className="hotel-card-image" />
      <GrFormNext onClick={nextImage} className="slideshow-next" />
    </div>
  );
};

export default SlideShow;
