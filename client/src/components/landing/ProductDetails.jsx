import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Button, Rate, Modal, Alert } from "antd";
import { Link, useParams } from "react-router-dom";
import { isEmpty } from "lodash";
import { getProduct } from "../../actions/productAction";
import { addToCart } from "../../actions/cartActions";
import { getProfile } from "../../actions/profileActions";
import { decodeUser } from "../../utils";
import NavBar from "../general/Navbar";


const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [visible, setVisible] = useState(false);
  const [images, setImages] = useState([]);
  const [gotProfile, setGotProfile] = useState(false);
  
  const { id } = useParams();
  const dispatch = useDispatch();

  const profile = useSelector((state) => state.profile.profile);
  const fetchedProduct = useSelector((state) => state.products.product);


  useEffect(() => {
    dispatch(getProduct(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (fetchedProduct) {
      // const productImages = [fetchedProduct.thumbnail, ...fetchedProduct.images];
      setProduct(fetchedProduct);
      // setImages(productImages);

      if (!gotProfile) {

        product != undefined && dispatch(getProfile(fetchedProduct.userId));
        setGotProfile(true);
      }
    }
  }, [fetchedProduct, gotProfile, dispatch]);

  const showModal = () => setVisible(true);
  const handleOk = () => setVisible(false);
  const handleCancel = () => setVisible(false);

  const registerModal = () => (
    <Modal
      open={visible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>Close</Button>
      ]}
    >
      <div>
        <br />
        <Alert
          message={
            <center>
              <span>
                <strong>Added</strong> {product.name} to Cart
              </span>
            </center>
          }
          type="success"
        />
        <br />
        <center>
          <Link to="/cart?redirect=/cart">
            <Button key="submit" type="primary">Go to Cart</Button>
          </Link>
        </center>
      </div>
    </Modal>
  );

  const addProductToCart = async () => {
    if (!localStorage.getItem("token")) {
      const productExists = !isEmpty(localStorage.getItem("products"));
      const products = productExists ? JSON.parse(localStorage.getItem("products")) : [];
      products.push(product._id);
      localStorage.setItem("products", JSON.stringify(products));
      showModal();
      return;
    }

    const userId = decodeUser().user.id;
    const context = { products: [product._id], userId };
     dispatch(addToCart(context));
    showModal();
  };

  const socialMediaLinks = profile ? {
    facebook: profile.socialMedia?.facebook?.startsWith("http") ? profile.socialMedia.facebook : `http${profile.socialMedia.facebook}`,
    instagram: profile.socialMedia?.instagram?.startsWith("http") ? profile.socialMedia.instagram : `http${profile.socialMedia.instagram}`,
    twitter: profile.socialMedia?.twitter?.startsWith("http") ? profile.socialMedia.twitter : `http${profile.socialMedia.twitter}`,
    linkedin: profile.socialMedia?.linkedin?.startsWith("http") ? profile.socialMedia.linkedin : `http${profile.socialMedia.linkedin}`,
  } : {};

  return (
    <Fragment>
      <Navbar />
      <div className="container">
        {product ? (
          <Fragment>
            <div className="row">
              <div className="carousel slide carousel-fade carousel-thumbnails" style={{ width: "500px" }}>
                <div className="carousel-inner" role="listbox">
                  {images.map((image, index) => (
                    <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                      <img className="d-block w-100" src={image} alt={`Slide ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-6">
                <h1>{product.name}</h1>
                <p>Description: {product.description}</p>
                <p>Features:</p>
                {product.features ? (
                  <ul>
                    {product.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No feature listed</p>
                )}
                <Rate disabled allowHalf defaultValue={product.rating} />
                <p>Quantity: {product.quantity}</p>
                <h1>${product.price}</h1>
                <button className="btn btn-primary" onClick={() => addProductToCart(product)}>Add to Cart</button>
              </div>
            </div>
            <br />
            <h1>Product Details</h1>
            <p><b>{product.details}</b></p>
            <p>Main Features of Product:</p>
            {product.features ? (
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            ) : (
              <p>No feature listed</p>
            )}
            <hr />
            <h3>Seller Information</h3>
            {profile && (
              <Fragment>
                <nav>
                  <div className="nav nav-tabs">
                    <a className="nav-item nav-link active" href="#home" role="tab" data-toggle="tab">Home</a>
                    <a className="nav-item nav-link" href="#social-media" role="tab" data-toggle="tab">Social Media</a>
                    <a className="nav-item nav-link" href="#contact" role="tab" data-toggle="tab">Contact</a>
                  </div>
                </nav>
                <div className="tab-content">
                  <div className="tab-pane fade show active" id="home" role="tabpanel">
                    <br />
                    <h4>About Seller</h4>
                    {profile.bio && <p>{profile.bio}</p>}
                  </div>
                  <div className="tab-pane fade" id="social-media" role="tabpanel">
                    <br />
                    <h4>Follow Us:</h4>
                    <div className="row">
                      {socialMediaLinks.facebook && (
                        <a href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook fa-2x"></i></a>
                      )}
                      {socialMediaLinks.instagram && (
                        <a href={socialMediaLinks.instagram} target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram fa-2x"></i></a>
                      )}
                      {socialMediaLinks.twitter && (
                        <a href={socialMediaLinks.twitter} target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter fa-2x"></i></a>
                      )}
                      {socialMediaLinks.linkedin && (
                        <a href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin fa-2x"></i></a>
                      )}
                    </div>
                  </div>
                  <div className="tab-pane fade" id="contact" role="tabpanel">
                    <br />
                    {profile.address && <p>Address: {profile.address}</p>}
                  </div>
                </div>
              </Fragment>
            )}
          </Fragment>
        ) : (
          <Spin size="large" />
        )}
      </div>
      {product && registerModal()}
    </Fragment>
  );
};

export default ProductDetails;
