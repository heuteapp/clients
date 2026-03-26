import React from "react";
import NextBreadcrumbs from "@mui/material/Breadcrumbs";
import { BreadcrumbsItem, BreadcrumbsProps } from "@/src/modules/ui-base/types/breadcrumbs.types";

export const Breadcrumbs = (props: BreadcrumbsProps) => {
    const getElement = (item: BreadcrumbsItem) => {
        return item.element ? item.element(item.name) 
            : props.defaultElement ? props.defaultElement(item.name)
            : item.name;
    };

    return (
        <NextBreadcrumbs>
            {props.items.map((item, index) => (
                <React.Fragment key={index}>{getElement(item)}</React.Fragment>
            ))}
        </NextBreadcrumbs>
    )
}