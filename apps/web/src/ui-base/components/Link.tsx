import NextLink from "next/link";
import { LinkProps } from "@/src/ui-base/types/ui.props.types";

export const Link = (props: LinkProps) => {
    let { href, linkType, children, ...componentProps } = props;

    linkType ||= "internal";

    if(href) {
        if (linkType === "internal") {
            return (
                <NextLink {...componentProps} href={href}>
                    {props.children}
                </NextLink>
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