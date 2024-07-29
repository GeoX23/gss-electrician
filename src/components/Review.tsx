import { motion } from "framer-motion";
import React from "react";

interface ReviewProps {
  name: string;
  reviewText: string;
  date: string;
}

export function Review(props: Readonly<ReviewProps>) {
  return (
    <motion.div className=" bg-white rounded-lg hover:drop-shadow-md flex flex-col p-4 text-black gap-2">
      <div className="text-lg font-bold">{props.name}</div>
      <div className="text-sm font-normal  mt-[-8px]">{props.date}</div>
      <div>{props.reviewText}</div>
    </motion.div>
  );
}
