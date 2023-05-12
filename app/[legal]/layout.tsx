export const dynamicParams = false;

interface LayoutProps {
    children: React.ReactNode;
}

// Metadata - replaces head.ts in Next 13.2
export const metadata = {
    title: "isThisPersonToxic Legal Information",
    description: "Legal information about isThisPersonToxic",
};

export default function LegalLayout({ children }: LayoutProps) {
    return <>{children}</>;
}
