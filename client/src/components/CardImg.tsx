import '../App.css';

import cardimg1 from '../assets/cardimg1.png'
import cardimg2 from '../assets/cardimg2.png'
import cardimg3 from '../assets/cardimg3.png'
import cardimg4 from '../assets/cardimg4.png'
import cardimg5 from '../assets/cardimg5.png'
import cardimg6 from '../assets/cardimg6.png'
import cardimg7 from '../assets/cardimg7.png'

const possible_card_images = [cardimg1, cardimg2, cardimg3, cardimg4, cardimg5, cardimg6, cardimg7]

function get_random_card_image() {
  return possible_card_images[Math.floor(Math.random() * possible_card_images.length)];
}

export default get_random_card_image;
