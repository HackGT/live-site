export type Item = {
  _id: string;
  name: string;
  shop_id: string;
  purchased: number;
  capacity: number;
  points: number;
  description: string;
  image: string;
  status: string;
  shippable: boolean;
  id: string;
  location?: string;
  image_url: string;
};

export default Item;
