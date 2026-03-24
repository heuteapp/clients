import { HeuteLinkProps } from "@/src/types/ui/components/app/HeuteLink";
import Link from "next/link";

export const HeuteLink = ({ children, href, type, style }: HeuteLinkProps) => {
    type ||= "internal";

    if(href) {
        if (type === "internal") {
            return (
                <Link href={href} style={style}>
                    {children}
                </Link>
            );
        }

        if (type === "external") {
            return (
                <a href={href} style={style} target="_blank" rel="noopener noreferrer">
                    {children}
                </a>
            );
        }
    }

    return <span style={style}>{children}</span>;
};