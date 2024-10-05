import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { SectionTitle } from "@/components/SectionTitle";
import { Benefits } from "@/components/Benefits";
import { Video } from "@/components/Video";
// import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { Cta } from "@/components/Cta";
import { Gallery } from "@/components/Testimonials";
import { benefitOne } from "@/components/data";
export default function Home() {
  return (
    <Container>
      <Hero />
      <SectionTitle
        id="ypiresies"
        preTitle="Υπηρεσίες"
        title=" Οι υπηρεσίες που παρέχουμε"
      >
        Ακολουθώντας υψηλά στάνταρ με επαγγελματισμό, ευθύνη και
        αποτελεσματικότητα.
      </SectionTitle>

      <Benefits data={benefitOne} />

      {/* <SectionTitle
        preTitle="Watch a video"
        title="Learn how to fullfil your needs"
      >
        This section is to highlight a promo or demo video of your product.
        Analysts says a landing page with video has 3% more conversion rate. So,
        don&apos;t forget to add one. Just like this.
      </SectionTitle>

      <Video videoId="fZ0D0cnR88E" /> */}
      {/* 
      <SectionTitle
        id="erga"
        preTitle="Έργα"
        title="Ολοκληρωμένα έργα από εμάς"
      >
        Παρακάτω μπορείτε να δείτε ολοκληρωμένα έργα μας.
      </SectionTitle> */}

      {/* <Testimonials /> */}
      {/* <Gallery /> */}

      <SectionTitle id="faq" preTitle="FAQ" title="Συχνές ερωτήσεις">
        Μπορείτε να βρείτε απαντήσεις σε συχνές ερωτήσεις που πιθανόν να έχετε
        σχετικά με τις υπηρεσίες μας.
      </SectionTitle>

      <Faq />
    </Container>
  );
}
