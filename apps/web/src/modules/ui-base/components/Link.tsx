import NextLink from "next/link";
import MUILink from "@mui/material/Link";
import { LinkProps } from "@/src/modules/ui-base/types/ui.props.types";

export const Link = (props: LinkProps) => {
    let { href, linkType, children, ...componentProps } = props;

    linkType ||= "internal";

    if(href) {
        if (linkType === "internal") {
            return (
                <MUILink component={NextLink} href={href} {...componentProps}>
                    {props.children}
                </MUILink>
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