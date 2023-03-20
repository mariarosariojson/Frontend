import { Helmet } from "react-helmet";

import FoodItem from "Src/components/FoodItem/FoodItem";

import "src/css/Food.css";

interface CreateProductProps {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
}

export default function FoodMenu({ imageUrl, name, price, id }: CreateProductProps) {
  const foodMenuProps = { imageUrl, name, price, id };

  return (
    <>
      <Helmet title="Food" />
     
      <div className="food-menu-container">
        <FoodItem {...foodMenuProps} />
      </div>
    </>
  );
}
