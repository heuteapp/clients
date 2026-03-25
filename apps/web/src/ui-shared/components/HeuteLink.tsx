import Link from "next/link";
import { HeuteLinkProps } from "@/src/ui-shared/types/ui.props.types";

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