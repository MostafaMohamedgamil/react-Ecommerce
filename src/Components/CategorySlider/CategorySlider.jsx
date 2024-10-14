import axios from "axios";
import React from "react";
import { FallingLines } from "react-loader-spinner";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Slider from "react-slick";

export default function CategorySlider() {


  function getCategories() {

    return axios.get('https://ecommerce.routemisr.com/api/v1/categories')
  }

  const { data, isLoading } = useQuery('categorySlider', getCategories);

  if (isLoading) {
    return <div className="d-flex vh-100 bg-primary bg-opacity-50 justify-content-center align-items-center">
      <FallingLines
        color="#fff"
        width="100"
        visible={true}
        ariaLabel="falling-circles-loading"
      />
    </div>
  }

  var settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    autoplay: true,
    speed: 10000,
    autoplaySpeed: 10000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
  return <>
    <h3>Shop Popular Categories</h3>
    <Slider {...settings}>

      {data.data.data.map((element, idx) => <div key={idx} >
        {/* <Link to={`${Categori._id}/${Categori.name}`}> */}

        <Link to={`/Categories/${element._id}/${element.name}`}>
          <div className="image me-2 rounded-2" style={{ borderStyle: 'solid', borderColor: '#0aad0a', }}>
            <img style={{ height: '200px' }} className="w-100 rounded-2" src={element.image} alt={element.name} />
          </div>
          <h6 className="text-main fw-bold text-center">{element.name}</h6>

        </Link>
      </div>)}

    </Slider>
  </>
}