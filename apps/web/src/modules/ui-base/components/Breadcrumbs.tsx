import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import { BreadcrumbsItem, BreadcrumbsProps } from "@/src/modules/ui-base/types/breadcrumbs.types";
import Box from "@mui/material/Box";

export const Breadcrumbs = ({ items, separator, wrapperElement, defaultElement, ...props }: BreadcrumbsProps) => {
    const getElement = (item: BreadcrumbsItem) => {
        return item.element ? item.element(item) 
            : defaultElement ? defaultElement(item)
            : item.name;
    };

    const getWrappedElement = (item: BreadcrumbsItem) => {
        const element = getElement(item);
        
        if (wrapperElement) {
            return wrapperElement(item, element);
        }
        return element;
    };

    const seperator = separator || <BreadcrumbsSeparator />;

    return (
        <MUIBreadcrumbs 
            sx={{
                li: {
                    display: 'flex',
                    alignItems: 'center',
                },
            }}
            {...props}
            separator={seperator}
        >
            {items.map((item) => (
                getWrappedElement(item)
            ))}
        </MUIBreadcrumbs>
    )
}

export const BreadcrumbsSeparator = ({ size = 20, color = "currentColor", strokeWidth = 1 }) => {
    return (
        <Box
            component="svg"
            viewBox="0 0 24 24"
            width={size}
            height={size}
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
            shapeRendering="geometricPrecision"
            aria-hidden="true"
        >
            <path d="M16 3.549L7.12 20.600" />
        </Box>
    );
};