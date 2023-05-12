import { Banner } from "@/components/about-us/banner";
import { ContactForm } from "@/components/about-us/contact";
import { ContactTitle } from "@/components/about-us/contact-title";

export default async function SobreNosotros() {
    return (
        <main>
            <Banner />
            <ContactTitle />
            <ContactForm />
        </main>
    );
}
