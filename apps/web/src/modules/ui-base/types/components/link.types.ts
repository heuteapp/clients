import { ComponentProps } from "./types";


export interface LinkProps extends ComponentProps, LinkData {

}

export type LinkData = {
    href?: string;
    linkType?: LinkType;
}

export type LinkType = "internal" | "external";