import { FeaturesMain } from "@/components/home/features-main";
import { Hero } from "@/components/home/hero";
import { StepsMain } from "@/components/home/steps-main";

export default function Home() {
    return (
        <main>
            <Hero />
            <StepsMain />
            <FeaturesMain />
        </main>
    );
}
