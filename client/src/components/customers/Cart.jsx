import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { isEmpty } from "lodash";
import { Empty, Button, List, Skeleton, Avatar } from "antd";
import { getCart, removeFromCart } from "../../actions/cartActions";
import Payment from "./Payment";
import NavBar from "../general/Navbar";



const Cart = ({ cart, getCart, removeFromCart }) => {
  const [cartData, setCartData] = useState({});

  useEffect(() => {
    getCart();
  }, [getCart]);

  useEffect(() => {
    if (cart && cart.cart) {
      setCartData(cart.cart);
    }
  }, [cart]);

  const removeProduct = (product) => {
    console.log(cartData)
    const id = cartData._id;
    const context = { id, product };
    removeFromCart(context).then(() => {
      getCart();
      window.location.reload();
    });
  };

  const calculateTotal = () => {
    let total = 0;
    const cartProducts = cartData.products;
    if (cartProducts && cartProducts.length > 0) {
      cartProducts.forEach((product) => {
        total += product.price;
      });
    }
    return total;
  };

  return (
    <>
      <Navbar />
      <br />
      <div className="container" style={{ textAlign: "center" }}>
        {isEmpty(cartData.products) ? (
          <div className="empty-cart-border">
            <Empty
              image="https://image.flaticon.com/icons/svg/34/34627.svg"
              description="Your Cart is empty. Keep Shopping"
              imageStyle={{ height: 60 }}
            >
              <Link to="/" className="btn btn-primary">
                Keep Shopping
              </Link>
            </Empty>
          </div>
        ) : (
          <div className="row">
            <div className="col-sm-8 col-md-8 col-lg-8">
              <List
                className="demo-loadmore-list"
                itemLayout="horizontal"
                dataSource={cartData.products || []}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Link to="#" key="list-loadmore-edit" onClick={() => removeProduct(item)}>
                        Remove from cart
                      </Link>,
                    ]}
                  >
                    <Skeleton avatar title={false} loading={item.loading} active>
                      <List.Item.Meta
                        avatar={<Avatar shape="square" size={100} src={item.thumbnail} />}
                        title={item.name}
                        description={item.description}
                      />
                      <div>
                        <b>{`$ ${item.price}`}</b>
                      </div>
                    </Skeleton>
                  </List.Item>
                )}
              />
            </div>
            <div className="col-sm-4 col-md-4 col-lg-4">
              <br />
              <br />
              <h4>{`Total: $ ${calculateTotal()}`}</h4>
              <Payment cart={cartData} total={calculateTotal()} />
            </div>
            <div style={{ textAlign: "center" }}>
              {cartData.products && (
                <Link to="/" className="btn btn-primary">
                  Keep Shopping
                </Link>
              )}
            </div>
          </div>
        )}
        <br />
        <br />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

export default connect(mapStateToProps, { getCart, removeFromCart })(Cart);
