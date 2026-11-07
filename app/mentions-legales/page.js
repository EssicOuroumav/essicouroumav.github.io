import { LegalPage } from "../components/Simple";
import { SITE_URL } from "../data";

export const metadata = {
  title: "Mentions légales · Cisse Vamourou",
  alternates: { canonical: `${SITE_URL}/mentions-legales/` },
};

export default function Page() {
  return <LegalPage />;
}
