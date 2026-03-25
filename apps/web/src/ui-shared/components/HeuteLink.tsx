import { HeuteLinkProps } from "@/src/types/ui/components/app/HeuteLink";
import Link from "next/link";

export const HeuteLink = (props: HeuteLinkProps) => {
    let { href, linkType, children, ...componentProps } = props;

    linkType ||= "internal";

    if(href) {
        if (linkType === "internal") {
            return (
                <Link {...componentProps} href={href}>
                    {props.children}
                </Link>
            );
        }

        if (linkType === "external") {
            return (
                <a {...componentProps} href={href}>
                    {props.children}
                </a>
            );
        }
    }

    return <span {...componentProps}>{props.children}</span>;
};