import NextLink from "next/link";
import MUILink from "@mui/material/Link";
import { LinkProps } from "@/src/modules/ui-base/types/components/link.types";

export const Link = ({ href, linkType, children, ...props }: LinkProps) => {
    linkType ||= "internal";

    const component = href ? (
        linkType === "internal" ? NextLink :
        linkType === "external" ? "a" : "span") 
        : "span";

    return (
        <MUILink {...props} component={component} href={href}>
            {children}
        </MUILink>
    );
};