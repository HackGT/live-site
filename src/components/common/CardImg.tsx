import cardimg1 from "../../assets/cardimg1.png";
import cardimg2 from "../../assets/cardimg2.png";
import cardimg3 from "../../assets/cardimg3.png";
import cardimg5 from "../../assets/cardimg5.png";
import cardimg6 from "../../assets/cardimg6.png";
import cardimg7 from "../../assets/cardimg7.png";

const POSSIBLE_CARD_IMAGES = [cardimg1, cardimg2, cardimg3, cardimg5, cardimg6, cardimg7];

export function getRandomCardImage() {
  return POSSIBLE_CARD_IMAGES[Math.floor(Math.random() * POSSIBLE_CARD_IMAGES.length)];
}
