import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Book from "../components/Book/Book";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import ReactModal from "react-modal";
import IconClose from "../icons/IconClose";
import axios from "axios";
import { apiURL } from "../config/config";
import { clear } from "../store/book/book-slice";
const OrderPage = () => {
  const orders = useSelector((state) => state.book);
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  if (!user) {
    return (
      <div className="h-full bg-lightGray flex items-center justify-center">
        Please{" "}
        <Link to="/sign-in" className="text-primary font-semibold">
          {" "}
          log in
        </Link>{" "}
        to use this page{" "}
      </div>
    );
  }
  function handleOrder() {
    setOpen(true);
  }
  async function handleOrderSubmit() {
    for (let i = 0; i < orders.length; i++) {
      await axios.post(`${apiURL}/borrow/create`, {
        userId: user._id,
        bookId: orders[i]._id,
        bookName: orders[i].name,
        userName: user.name,
      });
    }
    dispatch(clear());
    window.location.replace("/Library");
  }
  return (
    <div>
      <div className="bg-lightGray p-5">
        <div className="flex justify-between gap-5">
          <h4 className="text-xl">
            Your order:{" "}
            <span className="text-primary font-semibold">
              {orders.length} books
            </span>{" "}
          </h4>
          <Button onClick={handleOrder} primary>
            Order now
          </Button>
        </div>
        <hr className="my-3" />
        <div className="grid grid-cols-5 gap-5">
          {orders.map((item) => (
            <Book key={item._id} data={item}></Book>
          ))}
        </div>

        <div className="my-2 bg-primary p-1 rounded-md  bg-opacity-70 text-white ">
          Thank you for your order
        </div>
      </div>
      <ReactModal
        isOpen={open}
        overlayClassName={
          "modal-overlay fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center "
        }
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => setOpen(false)}
        className="modal-content w-full max-w-[521px] bg-white rounded-2xl outline-none p-10 relative max-h-[90vh] overflow-y-scroll scroll-hidden"
      >
        <button
          onClick={() => setOpen(false)}
          className="float-right w-6 h-6 duration-300  text-text1"
        >
          <IconClose></IconClose>
        </button>
        <h2 className="clear-both mb-10 text-2xl font-bold text-center ">
          Are you sure to borrow these books?
        </h2>
        <div className="flex gap-x-3">
          <Button
            isLoading={isLoading}
            primary
            fluid
            onClick={handleOrderSubmit}
          >
            Accept
          </Button>
          <Button transparent fluid onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </ReactModal>
    </div>
  );
};

export default OrderPage;
