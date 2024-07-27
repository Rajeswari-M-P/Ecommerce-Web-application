import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; 
import 'slick-carousel/slick/slick-theme.css';

const ProductCarousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 300, // 300 seconds = 300,000 milliseconds
    responsive: [
      {
        breakpoint: 1024,//the point at which the layout of a web page changes to accommodate the different screen size.
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const images = [
    'https://tiimg.tistatic.com/fp/1/007/665/stylish-fashionable-comfortable-blue-men-s-casual-shoes-475.jpg',

    'https://5.imimg.com/data5/ANDROID/Default/2023/6/316152036/KD/FA/RC/35945583/product-jpeg-500x500.jpg',
    'https://5.imimg.com/data5/MX/BK/AP/SELLER-40551879/ladies-embroidered-net-gown.jpg',
    'https://5.imimg.com/data5/CQ/JJ/JD/SELLER-90035980/wooden-double-bed.jpg',
    'https://5.imimg.com/data5/SELLER/Default/2020/8/CI/PL/PE/23082129/rf28n9780sg-tl-french-door-samsung-refrigerator.jpg',
    'https://5.imimg.com/data5/SELLER/Default/2021/8/MK/WJ/PX/24886161/cosmetic-products.jpg',
    'https://5.imimg.com/data5/ECOM/Default/2023/4/302671173/FT/NL/PL/3611652/8b3f3bd0-d170-433e-90fd-8a19caaf4565-12105428-originnm80prcnt-500x500.webp',
    'https://5.imimg.com/data5/ANDROID/Default/2021/3/WL/FB/FJ/7536045/product-jpeg-500x500.jpg',
  ];

  return (
    <div>
      
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className="carousel-slide">
            <img src={image} alt={`Slide ${index}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductCarousel;




















