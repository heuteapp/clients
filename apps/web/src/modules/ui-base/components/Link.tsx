import NextLink from "next/link";
import MUILink from "@mui/material/Link";
import { LinkProps } from "@/src/modules/ui-base/types/ui.props.types";

export const Link = (props: LinkProps) => {
    let { href, linkType, children, ...componentProps } = props;

    linkType ||= "internal";

    if(href) {
        const component = 
            linkType === "internal" ? NextLink :
            linkType === "external" ? "a" : undefined;

        if (component) {
            return (
                <MUILink component={NextLink} href={href} {...componentProps}>
                    {props.children}
                </MUILink>
            );
        }
    }

    return <span {...componentProps}>{props.children}</span>;
};