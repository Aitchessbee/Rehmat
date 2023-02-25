import styles from "./Styles/home.module.css"

import img1 from "./Images/img1.png"
import ourMission from "./Images/ourMission.png"
import locations from "./Images/locations.png"
import ellipse from "./Images/ellipse.png"
import gif1 from "./Images/gif1.gif"
import gif2 from "./Images/gif2.gif"
import gif3 from "./Images/gif3.gif"


import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper'
import 'swiper/css';
import 'swiper/css/navigation'

import TrendingFlatIcon from '@mui/icons-material/TrendingFlat';

import LocationMap from "./components/map"


function Home() {
  return (
    <div className={styles.home}>
      <div className="spacer"></div>
      <div className={styles.hero}>
        <img src={img1} alt="" className={styles.heroImg} />
        <img src={gif1} alt="" className={styles.heroImg} />
      </div>  

      <Swiper
        modules={[Pagination]}
        pagination
        spaceBetween={20}
        slidesPerView={2.5}
        className={styles.carousel}
      >
        <SwiperSlide><div className={styles.tile}>1</div></SwiperSlide>
        <SwiperSlide><div className={styles.tile}>2</div></SwiperSlide>
        <SwiperSlide><div className={styles.tile}>3</div></SwiperSlide>
        <SwiperSlide><div className={styles.tile}>4</div></SwiperSlide>
        ...
      </Swiper>

      <div>
        <img src={ourMission} alt="" className={styles.ourMissionHeading}/>
        <div className={styles.ourMission}>
          <div className={styles.ourMissionContent}>CONNECTING REFUGEES AND DOCTORS <br /> TO PROVIDE FREE HEALTHCARE FOR REFUGEES</div>

          <div className={styles.columns}>
            <div className={`${styles.aboutUs} ${styles.column}`}>
              <div className={styles.aboutUsHeading}>ABOUT US</div>
              <div className={styles.aboutUsContent}>REHMAT: Refugee Health Management System  is a non-profit organization, that aims to aid refugees, and provide them with consultation free of cost. <br /> <br /> Keeping in mind the SDGs we have established a network of doctors, specialised across various domains.
              </div>
            </div>

            <div className={styles.column}> 
              <img src={gif2} alt="" style={{display: "block", margin: "0 auto"}}/>
            </div>

            <div className={styles.column}>
              <div className={styles.ourProgress}>
                <div className={styles.ourProgressHeading}>
                  {/* <img src={ellipse} alt=""/> */}
                  <span>OUR PROGRESS</span>
                  <TrendingFlatIcon />
                </div>
                <div>5000+ PATIENTS HEALED</div>
                <div>AIDED 500+ REFUGEE CAMPS</div>
                <div>1000+ DOCTORS</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <img src={locations} alt="" style={{display: "block", margin: "0 auto"}} />
        <LocationMap />
      </div>


    </div>
  )
}

export default Home