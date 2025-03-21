"use client";

import Image from "next/image";
import { Container } from "@/components/Container";
import heroImg from "../../public/img/hero.png";
import { Review } from "./Review";
import { motion } from "framer-motion";
import Link from "next/link";
import { CarouselComp } from "./Carousel";

export const Hero = () => {
  function clickProsfores(e: any) {
    document.getElementById("prosforesBtn")?.click();
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <Container className="flex flex-wrap sm:flex-row  flex-col-reverse">
          <div className="flex items-center w-full lg:w-1/2">
            <div className="max-w-2xl mb-8">
              <h1 className="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
                Στεργιόπουλος Ιωάννης <br />
                <p className="py-2 lg:py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-300">
                  Ηλεκτρολόγος
                </p>
              </h1>
              <p className="pb-5 pt-2 lg:py-5 text-md leading-normal text-gray-500 lg:text-md xl:text-md dark:text-gray-300">
                Παρέχουμε υπηρεσίες υψηλού επιπέδου με τεχνογνωσία και συνέπεια.
                Διεκπαιρεώνουμε μια ευρεία γκάμα ηλεκτρολογικών έργων, από μικρά
                έως και πολύπλοκα, και είμαστε πάντα στη διάθεσή σας για να
                καλύψουμε κάθε ηλεκτρολογική ανάγκη σας!
              </p>

              <div className="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
                <button
                  className="px-8 py-4 text-lg font-medium text-center text-white bg-indigo-600 rounded-md "
                  onClick={clickProsfores}
                >
                  Ζητήστε προσφορά
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center w-full lg:w-1/2">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="w-full h-fit"
            >
              <CarouselComp />
            </motion.div>
          </div>
        </Container>
      </motion.div>
      <Container>
        <div className="flex flex-col justify-center" id="reviews">
          <div className="text-xl text-center text-gray-700 dark:text-white">
            Πάνω από{" "}
            <Link href="/reviews">
              <span className="text-indigo-600 underline">
                <strong>120 θετικές αξιολογήσεις</strong>
                <br />
              </span>
            </Link>
            σε{" "}
            <Link
              href="https://www.facebook.com/profile.php?id=100067818661953"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-bold"
            >
              Facebook
            </Link>{" "}
            και{" "}
            <Link
              href="https://www.douleutaras.gr/dashboard-v2/profile/giannisstergiopoulos/?ref=Admin%20page"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 font-bold"
            >
              Douleutaras
            </Link>
          </div>

          <div className="flex flex-nowrap justify-start gap-10 mt-10 md:justify-around overflow-hidden p-2">
            <motion.div
              className="flex flex-nowrap gap-10 cursor-grab active:cursor-grabbing"
              drag="x"
              dragConstraints={{ right: 0, left: -1000 }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{
                duration: 1,
                delay: 0.5,
              }}
              exit={{ opacity: 0 }}
            >
              <div className="pt-2 text-gray-400 dark:text-gray-400 cursor-pointer">
                <Review
                  name="George G."
                  date="24/01/2023"
                  reviewText="Εξαιρετική ποιότητα εργασίας, τακτική και ασφαλής τοποθέτηση καλωδίων κι εξοπλισμού, τρία χρόνια λειτουργούμε απροβλημάτιστα το επαγγελματικό μας κτήριο."
                />
              </div>

              <div className="pt-2 text-gray-400 dark:text-gray-400 cursor-pointer">
                <Review
                  name="Βασίλης Ν."
                  date="17/12/2022"
                  reviewText="Τον βρήκα στις 22:15 Παρασκευή βράδυ, του τηλεφώνησα γιατί ήμουν χωρίς ρεύμα στο σπίτι. Στις 23:00 κιόλας ήταν σπίτι μου χωρίς δεύτερη σκέψη, επαγγελματίας από τους λίγους.  Το πρόβλημα λύθηκε επιτόπου.  Ευχαριστώ πάρα πολύ!"
                />
              </div>

              <div className="pt-2 text-gray-400 dark:text-gray-400 cursor-pointer">
                <Review
                  name="Ιωάννης Κλ."
                  date="23/12/2022"
                  reviewText="Σπάνιος επαγγελματίας που οικειοπειταί με το πρόβλημά σου, ευγενικός και πολύ προσεκτικός. Τον συνιστώ οπωσδήποτε."
                />
              </div>

              <div className="pt-2 text-gray-400 dark:text-gray-400 cursor-pointer">
                <Review
                  name="Χρήστος Μ."
                  date="22/12/2022"
                  reviewText="Πολύ καλός επαγγελματίας, φαίνεται πως ξέρει την δουλειά που κάνει.  Το πιο βασικό, είναι καθαρός και σέβεται τον χώρο σου!"
                />
              </div>

              <div className="pt-2 text-gray-400 dark:text-gray-400 cursor-pointer">
                <Review
                  name="Μάγδα Χ."
                  date="22/12/2022"
                  reviewText="Άψογος!!!"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </>
  );
};
