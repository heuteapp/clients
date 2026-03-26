import React from "react";
import NextBreadcrumbs from "@mui/material/Breadcrumbs";
import { BreadcrumbsItem, BreadcrumbsProps } from "@/src/modules/ui-base/types/breadcrumbs.types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export const Breadcrumbs = (props: BreadcrumbsProps) => {
    const getElement = (item: BreadcrumbsItem) => {
        return item.element ? item.element(item.name) 
            : props.defaultElement ? props.defaultElement(item.name)
            : item.name;
    };

    const seperator = props.separator || <NavigateNextIcon fontSize="small" />;

    return (
        <NextBreadcrumbs separator={seperator}>
            {props.items.map((item, index) => (
                <React.Fragment key={index}>{getElement(item)}</React.Fragment>
            ))}
        </NextBreadcrumbs>
    )
}