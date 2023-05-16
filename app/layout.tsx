import { Footer } from "@/components/footer";
import { Providers } from "./providers";
import { Header } from "@/components/header";
import { Analytics } from "@vercel/analytics/react";

// Metadata - replaces head.ts in Next 13.2
export const metadata = {
    title: "isThisPersonToxic - Find out if a person is toxic",
    description: "Get a report on a person's toxicity. Powered by AI",
    icons: {
        icon: "/favicon.svg",
        shortcut: "/favicon.svg",
        other: {
            rel: "og:image",
            url: "/favicon.svg",
        },
    },
};

interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en" style={{ scrollBehavior: "smooth" }}>
            <body>
                <Providers>
                    <Header />
                    {children}
                    <Analytics />
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
