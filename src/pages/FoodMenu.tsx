import { Col, Row } from "react-bootstrap";
import { Helmet } from "react-helmet";

import FoodItem from "Src/components/FoodItem/FoodItem";

import "src/css/FoodItem.css";

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
      <div className="food-menu-header">
        <h2>Meny för mat och dryck</h2>
      </div>
      <div className="food-menu-container">
        <Row>
          <Col>
            <FoodItem {...foodMenuProps} />
          </Col>
        </Row>
      </div>
    </>
  );
}
