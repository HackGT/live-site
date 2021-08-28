import '../App.css';

import placeholder from '../assets/blue.png'

const CardImg: React.FC = () => {
  return (
    <div>
      <img src={placeholder} className="card_img" />
    </div>
  )
}

export default CardImg;
