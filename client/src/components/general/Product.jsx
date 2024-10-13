import React from "react";
import { Card, Button } from "antd";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

const { Meta } = Card;

const Product = ({
  product,
  description,
  uploadImages,
  link,
  thumbnail,
  showBtn,
}) => {
  return (
        <Card
          hoverable
          style={{ width: 300, margin:10 }}
          cover={<Link to={link || ""}>
            <img alt="example" src="https://img.freepik.com/free-photo/black-friday-elements-assortment_23-2149074075.jpg" /></Link>}
          >
          <Meta title={product.name} description={description} />
            {showBtn && (
              <Link className="btn btn-primary" to={uploadImages}>
               Add Images
              </Link>
            )}

        </Card>
  );
};

Product.propTypes = {
  product: propTypes.object.isRequired,
  //description: propTypes.func.isRequired,
  //ßbuttonName: propTypes.string,
};

export default Product;
