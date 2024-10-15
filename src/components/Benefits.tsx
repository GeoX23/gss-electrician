"use client";

import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";
import { motion } from "framer-motion";

interface BenefitsProps {
  imgPos?: "left" | "right";
  id?: string;
  data: {
    imgPos?: "left" | "right";
    title: string;
    image: any;
    bullets: {
      title: string;
      // desc: string;
      icon: React.ReactNode;
    }[];
  };
}
export const Benefits = (props: Readonly<BenefitsProps>) => {
  const { data } = props;
  return (
    <Container
      id={props.id}
      className="flex flex-wrap mb-20 lg:gap-10 lg:flex-nowrap"
    >
      <motion.div
        className={`flex items-center justify-center w-full lg:w-1/2 ${
          props.imgPos === "right" ? "lg:order-1" : ""
        }`}
        initial={{ x: "-100%", opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div>
          <Image
            src={data.image}
            width={521}
            height={521}
            alt="Benefits"
            className={"object-cover"}
            placeholder="blur"
            blurDataURL={data.image.src}
          />
        </div>
      </motion.div>

      <motion.div
        className={`flex flex-wrap items-start w-full lg:w-1/2 ${
          data.imgPos === "right" ? "lg:justify-end" : ""
        }`}
        initial={{ x: "100%", opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div>
          <div className="w-full mt-5">
            {data.bullets.map((item, index) => (
              <Benefit key={index} title={item.title} icon={item.icon}>
                {/* {item.desc} */}
              </Benefit>
            ))}
          </div>
        </div>
      </motion.div>
    </Container>
  );
};

function Benefit(props: any) {
  return (
    <div className="flex items-center mt-4 space-x-3">
      <div className="flex items-center justify-center flex-shrink-0 mt-1 bg-indigo-500 rounded-md w-8 h-8 ">
        {React.cloneElement(props.icon, {
          className: "w-7 h-7 text-indigo-50",
        })}
      </div>
      <div>
        <h4 className="text-xl font-medium text-gray-800 dark:text-gray-200">
          {props.title}
        </h4>
      </div>
    </div>
  );
}
