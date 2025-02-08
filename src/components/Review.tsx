import { motion } from "framer-motion";
import React, { useState } from "react";
import Modal from "./Modal";

interface ReviewProps {
  name: string;
  reviewText: string;
  date: string;
}

export function Review(props: Readonly<ReviewProps>) {
  const [showModal, setShowModal] = useState<boolean>(false);

  function toggleModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <Modal open={showModal} onClose={toggleModal}>
        <div className="text-black">{props.reviewText}</div>
      </Modal>
      <motion.div
        className=" dark:bg-white bg-slate-50 rounded-lg hover:drop-shadow-md flex flex-col p-4 text-black gap-2 min-w-60 lg:w-80 w-full items-start cursor-pointer"
        onClick={toggleModal}
      >
        <div className="text-lg font-bold">{props.name}</div>
        <div className="flex justify-between items-center">
          <div className="text-sm font-normal flex items-center">
            {props.date}
          </div>
          <div>⭐️⭐️⭐️⭐️⭐️</div>
        </div>
        <div>
          {props.reviewText.length < 80
            ? props.reviewText
            : props.reviewText.slice(0, 80) + "..."}
        </div>
      </motion.div>
    </>
  );
}
