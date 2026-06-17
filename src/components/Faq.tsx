"use client";

import { Container } from "@/components/Container";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";

const PANEL_TRANSITION = { duration: 0.3, ease: "easeInOut" as const };

export const Faq = () => {
  return (
    <Container className="!p-0">
      <div className="w-full max-w-2xl p-2 mx-auto rounded-2xl">
        {faqdata.map((item) => (
          <div key={item.question} className="mb-5">
            <Disclosure>
              {({ open }) => (
                <div>
                  <DisclosureButton
                    className={`flex w-full items-center justify-between px-4 py-4 text-left text-md text-gray-800 bg-gray-50 transition-colors duration-300 hover:bg-gray-100 focus:outline-none focus-visible:ring focus-visible:ring-indigo-100 focus-visible:ring-opacity-75 dark:bg-trueGray-800 dark:text-gray-200 ${
                      open ? "rounded-t-lg" : "rounded-lg"
                    }`}
                  >
                    <span>{item.question}</span>
                    <ChevronUpIcon
                      className={`h-5 w-5 shrink-0 text-indigo-500 transition-transform duration-300 ease-in-out ${
                        open ? "rotate-0" : "rotate-180"
                      }`}
                    />
                  </DisclosureButton>
                  <DisclosurePanel static className="overflow-hidden">
                    <motion.div
                      initial={false}
                      animate={{
                        height: open ? "auto" : 0,
                        opacity: open ? 1 : 0,
                      }}
                      transition={PANEL_TRANSITION}
                      className="overflow-hidden"
                    >
                      <div className="rounded-b-lg bg-gray-200 px-4 pt-4 pb-4 text-gray-500 dark:bg-trueGray-500 dark:text-gray-300">
                        {item.answer}
                      </div>
                    </motion.div>
                  </DisclosurePanel>
                </div>
              )}
            </Disclosure>
          </div>
        ))}
      </div>
    </Container>
  );
};

const faqdata = [
  {
    question: "Ποιες περιοχές εξυπηρετείτε;",
    answer: `Εξυπηρετούμε όλη την Αττική. Οι περιοχές που εξυπηρετούμε άμεσα είναι Νίκαια, Κορυδαλλός, Αγία Βαρβάρα, Πειραιάς, Παλαιό Φάληρο, Νέο Φάληρο, Μοσχάτο, Καλλιθέα, Περιστέρι, Κερατσίνι και Πέραμα.`,
  },
  {
    question: "Πως μπορώ να επικοινωνήσω μαζί σας;",
    answer:
      "Μπορείτε να μας καλέσετε στο 6945335942 (ή πατώντας στο 'Καλέστε μας΄ από το μενού), να μας στείλτε email στο electrician.stergiopoulos@gmail.com ή να συμπληρώσετε την φόρμα επικοινωνίας που βρίσκεται κάτω δεξιά στη σελίδα μας.",
  },
];
