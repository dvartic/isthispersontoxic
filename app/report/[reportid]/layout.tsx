import type { Metadata } from "next";

interface LayoutProps {
    children: React.ReactNode;
}

// You need to get information about the route to generate metadata

// Metadata - replaces head.ts in Next 13.2
export const metadata = {
    title: "isThisPersonToxic Report",
    description: "Legal information about isThisPersonToxic",
};

export function generateMetadata({ params }): Promise<Metadata> {}

export default function LegalLayout({ children }: LayoutProps) {
    return <>{children}</>;
}
