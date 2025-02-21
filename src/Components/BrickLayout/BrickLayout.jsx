import image1 from "../../assets/img/image1.jpeg"
import image2 from "../../assets/img/image2.jpeg"
import image3 from "../../assets/img/image3.jpeg"
import image4 from "../../assets/img/image4.jpeg"
import image5 from "../../assets/img/image5.jpeg"
import "./BrickLayout.css"

const BrickLayout = ({ texte }) => {
  return (
    <div className="brick-layout">
      <div className="brick-column">
        <img src={image1} alt="" />
        <img src={image2} alt="" />
        <img src={image3} alt="" />
      </div>
      <div className="brick-column">
        <img src={image4} alt="" />
        <h3 className="h3">{texte}</h3>
        <img src={image5} alt="" />
        <img src={image1} alt="" />
      </div>
      <div className="brick-column">
        <img src={image2} alt="" />
        <img src={image3} alt="" />
        <img src={image4} alt="" />
      </div>
    </div>
  )
}

export default BrickLayout