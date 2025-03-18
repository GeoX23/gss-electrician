import { Container } from "@/components/Container";
import { Reviews } from "@/components/Reviews";
import { SectionTitle } from "@/components/SectionTitle";
import Link from "next/link";

export default function ReviewsPage() {
  return (
    <Container>
      <SectionTitle preTitle="Αξιολογήσεις" title="Τι λένε οι πελάτες μας">
        Διαβάστε τις αξιολογήσεις των πελατών μας για τις υπηρεσίες μας.
        <span className="flex justify-center text-sm mt-2">
          Αφήστε μας και εσείς την αξιολόγηση σας στην
          <Link
            href="https://www.google.com/maps/place/%CE%A3%CE%A4%CE%95%CE%A1%CE%93%CE%99%CE%9F%CE%A0%CE%9F%CE%A5%CE%9B%CE%9F%CE%A3+%CE%93%CE%99%CE%91%CE%9D%CE%9D%CE%97%CE%A3-%CE%97%CE%9B%CE%95%CE%9A%CE%A4%CE%A1%CE%9F%CE%9B%CE%9F%CE%93%CE%9F%CE%99+%CE%9D%CE%99%CE%9A%CE%91%CE%99%CE%91/@37.9686885,23.6403296,17z/data=!4m8!3m7!1s0x14a1bb00287076b3:0x7c282f323f26be65!8m2!3d37.9686885!4d23.6429099!9m1!1b1!16s%2Fg%2F11y8g2cqwj?entry=ttu&g_ep=EgoyMDI1MDMxMi4wIKXMDSoASAFQAw%3D%3D"
            target="_blank"
            className="ml-1 underline text-indigo-500 font-bold"
          >
            Google
          </Link>
        </span>
      </SectionTitle>

      <Reviews />
    </Container>
  );
}
