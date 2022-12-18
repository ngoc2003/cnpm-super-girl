import React, { useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { v4 } from "uuid";
import Button from "../Button";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import IconClose from "../../icons/IconClose";
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
        <ReactModal
          isOpen={show}
          overlayClassName={
            "modal-overlay fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center "
          }
          shouldCloseOnOverlayClick={true}
          onRequestClose={() => setShow(false)}
          className="modal-content w-full max-w-[521px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-scroll scroll-hidden"
        >
          <button
            onClick={() => setShow(false)}
            className="float-right w-6 h-6 duration-300  text-text1"
          >
            <IconClose></IconClose>
          </button>
          <div className="h-2 w-full clear-both"></div>

          {!user ? (
            <div className="text-sm p-2 text-darkGray">
              You need to{" "}
              <Link className="text-primary" to="/sign-in">
                log in
              </Link>{" "}
              first{" "}
            </div>
          ) : !cart.length ? (
            <>
              <div className="p-3">No items</div>
              <Button to="/List" primary fluid>
                Your List Order
              </Button>
            </>
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
                <Button to="/List" fluid>
                  Your List Order
                </Button>
                <Button to="/Order" primary fluid>
                  Order
                </Button>
              </div>
            </>
          )}
        </ReactModal>
      )}
    </div>
  );
};

export default Cart;
