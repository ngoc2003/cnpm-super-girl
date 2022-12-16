import React, { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import Button from "../Button";
import { Link } from "react-router-dom";
const Cart = () => {
  const { user } = useSelector((state) => state.auth);
  const [show, setShow] = useState(false);
  const cart = useSelector((state) => state.book);

  function handleToggleShow() {
    setShow(!show);
  }
  return (
    <div className="relative">
      <ShoppingCartOutlined
        className="cursor-pointer"
        onClick={handleToggleShow}
      />
      {show && (
        <div className="bg-white right-0 w-[300px] shadow-md p-3 border rounded-md mt-5 absolute z-50">
          {!user ? (
            <div className='text-sm p-2 text-darkGray'>
              You need to <Link className='text-primary' to="/sign-in">log in</Link> first{" "}
            </div>
          ) : !cart.length ? (
            <div>No items</div>
          ) : (
            <>
              <h4 className="text-xs mb-5">Your cart has {cart.length} item</h4>
              {cart.map((item) => (
                <>
                  <div className="flex gap-5" key={v4()}>
                    <div className="h-[100px] ">
                      <img
                        src={item.image}
                        className="h-full object-cover"
                        alt=""
                      />
                    </div>
                    <div>
                      <h4 className="text-lg">{item.name}</h4>
                      <p className="text-sm">{item.author}</p>
                      <p className="text-xs text-darkGray">x 1</p>
                    </div>
                  </div>
                  <hr className="my-5" />
                </>
              ))}
              <div className="flex gap-5">
                <Button to="/Order" primary fluid>
                  Order
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Cart;
