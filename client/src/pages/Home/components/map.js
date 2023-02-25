import styles from "../Styles/map.module.css"

function LocationMap() {
  return (
    <div className="container">
    <div className="mapContainer">
        <img src="http://res.cloudinary.com/slzr/image/upload/v1500321012/world-map-1500_vvekl5.png" />
        <div className={`${styles.point} ${styles.venezuela}`} title="Venezuela"></div>
        <div className={`${styles.point} ${styles.brasil}`} title="Brasil"></div>
        <div className={`${styles.point} ${styles.argentina}`} title="Argentina"></div>
        <div className={`${styles.point} ${styles.colombia}`} title="Colombia"></div>
        <div className={`${styles.point} ${styles.panama}`} title="Panamá"></div>
        <div className={`${styles.point} ${styles.mexico}`} title="Mexico"></div>
        <div className={`${styles.point} ${styles.usa}`} title="Estados Unidos"></div>
        <div className={`${styles.point} ${styles.arabia}`} title="Arabia Saudi"></div>
        <div className={`${styles.point} ${styles.turquia}`} title="Turquía"></div>     
        <div className={`${styles.point} ${styles.rusia}`} title="Rusia"></div>
        <div className={`${styles.point} ${styles.china}`} title="China"></div>
        <div className={`${styles.point} ${styles.japon}`} title="Japon"></div>
        <div className={`${styles.point} ${styles.australia}`} title="Australia"></div>
    </div>
    </div>


  )
}

export default LocationMap