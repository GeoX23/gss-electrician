"use client";

import Image from "next/image";
import { Container } from "@/components/Container";
import heroImg from "../../public/img/hero.png";
import { Review } from "./Review";
import { motion } from "framer-motion";
export const Hero = () => {
  return (
    <>
      <Container className="flex flex-wrap">
        <div className="flex items-center w-full lg:w-1/2">
          <div className="max-w-2xl mb-8">
            <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
              Γιάννης Στεργιόπουλος <br />
              <p className="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                Ηλεκτρολόγος
              </p>
            </h1>
            <p className="py-5 text-md leading-normal text-gray-500 lg:text-md xl:text-md dark:text-gray-300">
              Παρέχουμε υπηρεσίες υψηλού επιπέδου με τεχνογνωσία και συνέπεια.
              Διεκπαιρεώνουμε μια ευρεία γκάμα ηλεκτρολογικών έργων, από μικρά
              έως και πολύπλοκα, και είμαστε πάντα στη διάθεσή σας για να
              καλύψουμε κάθε ηλεκτρολογική ανάγκη σας!
            </p>

            <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
              <a
                href="#reviews"
                rel="noopener"
                className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md "
              >
                Αξιολογήσεις
              </a>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <Image
              src={heroImg}
              width="616"
              height="617"
              className={"object-cover"}
              alt="Hero Illustration"
              loading="eager"
            />
          </motion.div>
        </div>
      </Container>
      <Container>
        <div className="flex flex-col justify-center" id="reviews">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Πάνω από{" "}
            <span className="text-indigo-600">
              <strong>120 θετικές</strong>
            </span>{" "}
            αξιολογήσεις
          </div>

          <motion.div
            className="flex flex-nowrap justify-start gap-10 mt-10 md:justify-around overflow-auto p-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.5,
            }}
            exit={{ opacity: 0 }}
          >
            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <Review
                name="George G."
                date="24/01/2023"
                reviewText="Εξαιρετική ποιότητα εργασίας, τακτική και ασφαλής τοποθέτηση καλωδίων κι εξοπλισμού, τρία χρόνια λειτουργούμε απροβλημάτιστα το επαγγελματικό μας κτήριο."
              />
            </div>

            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <Review
                name="Βασίλης Ν."
                date="17/12/2022"
                reviewText="Τον βρήκα στις 22:15 Παρασκευή βράδυ, του τηλεφώνησα γιατί ήμουν χωρίς ρεύμα στο σπίτι. Στις 23:00 κιόλας ήταν σπίτι μου χωρίς δεύτερη σκέψη, επαγγελματίας από τους λίγους.  Το πρόβλημα λύθηκε επιτόπου.  Ευχαριστώ πάρα πολύ!"
              />
            </div>

            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <Review
                name="Ιωάννης Κλ."
                date="23/12/2022"
                reviewText="Σπάνιος επαγγελματίας που οικειοπειταί με το πρόβλημά σου, ευγενικός και πολύ προσεκτικός. Τον συνιστώ οπωσδήποτε."
              />
            </div>

            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <Review
                name="Χρήστος Μ."
                date="22/12/2022"
                reviewText="Πολύ καλός επαγγελματίας, φαίνεται πως ξέρει την δουλειά που κάνει.  Το πιο βασικό, είναι καθαρός και σέβεται τον χώρο σου!"
              />
            </div>

            <div className="pt-2 text-gray-400 dark:text-gray-400">
              <Review
                name="Μάγδα Χ."
                date="22/12/2022"
                reviewText="Άψογος!!!"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </>
  );
};
