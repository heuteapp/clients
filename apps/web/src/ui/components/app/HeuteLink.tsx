import { HeuteLinkProps } from "@/src/types/ui/components/app/HeuteLink";
import Link from "next/link";

export const HeuteLink = (props: HeuteLinkProps) => {
    let { href, linkType, children, ...componentProps } = props;

    linkType ||= "internal";

    if(href) {
        if (props.linkType === "internal") {
            return (
                <Link {...componentProps} href={href}>
                    {props.children}
                </Link>
            );
        }

        if (props.linkType === "external") {
            return (
                <a {...componentProps} href={href} target="_blank" rel="noopener noreferrer">
                    {props.children}
                </a>
            );
        }
    }

    return <span {...componentProps}>{props.children}</span>;
};