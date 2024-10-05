"use client";

import Image from "next/image";
import React from "react";
import { Container } from "@/components/Container";

import userOneImg from "../../public/img/user1.jpg";
import userTwoImg from "../../public/img/user2.jpg";
import userThreeImg from "../../public/img/user3.jpg";

import { useState } from "react";

interface GalleryItemProps {
  src: string;
  alt: string;
  title: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ src, alt, title }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full h-64 relative overflow-hidden rounded-lg">
        <Image
          src={src}
          alt={alt}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-200">
        {title}
      </h3>
    </div>
  );
};

export const Gallery: React.FC = () => {
  const [items] = useState<GalleryItemProps[]>([
    { src: "/img/gallery1.jpg", alt: "Gallery Image 1", title: "Project One" },
    { src: "/img/gallery2.jpg", alt: "Gallery Image 2", title: "Project Two" },
    {
      src: "/img/gallery3.jpg",
      alt: "Gallery Image 3",
      title: "Project Three",
    },
  ]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item, index) => (
        <GalleryItem key={index} {...item} />
      ))}
    </div>
  );
};

// export const Testimonials = () => {
//   return (
//     <Container>
//       <div className="grid gap-10 lg:grid-cols-2 xl:grid-cols-3">
//         <div className="lg:col-span-2 xl:col-auto">
//           <div className="flex flex-col justify-between w-full h-full bg-gray-100 px-14 rounded-2xl py-14 dark:bg-trueGray-800">
//             <p className="text-2xl leading-normal ">
//               Share a real <Mark>testimonial</Mark>
//               that hits some of your benefits from one of your popular customer.
//             </p>

//             <Avatar
//               image={userOneImg}
//               name="Sarah Steiner"
//               // title="VP Sales at Google"
//             />
//           </div>
//         </div>
//       </div>
//     </Container>
//   );
// };

// interface AvatarProps {
//   image: any;
//   name: string;
//   // title: string;
// }

// function Avatar(props: Readonly<AvatarProps>) {
//   return (
//     <div className="flex items-center mt-8 space-x-3">
//       <div className="flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
//         <Image
//           src={props.image}
//           width="40"
//           height="40"
//           alt="Avatar"
//           placeholder="blur"
//         />
//       </div>
//       <div>
//         <div className="text-lg font-medium">{props.name}</div>
//       </div>
//     </div>
//   );
// }

// function Mark(props: { readonly children: React.ReactNode }) {
//   return (
//     <>
//       {" "}
//       <mark className="text-indigo-800 bg-indigo-100 rounded-md ring-indigo-100 ring-4 dark:ring-indigo-900 dark:bg-indigo-900 dark:text-indigo-200">
//         {props.children}
//       </mark>{" "}
//     </>
//   );
// }
