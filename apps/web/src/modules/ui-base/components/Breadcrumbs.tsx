import NextBreadcrumbs from "@mui/material/Breadcrumbs";
import { BreadcrumbsItem, BreadcrumbsProps } from "@/src/modules/ui-base/types/breadcrumbs.types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Box from "@mui/material/Box";

export const Breadcrumbs = (props: BreadcrumbsProps) => {
    const getElement = (item: BreadcrumbsItem) => {
        return item.element ? item.element(item) 
            : props.defaultElement ? props.defaultElement(item)
            : item.name;
    };

    const getWrappedElement = (item: BreadcrumbsItem) => {
        const element = getElement(item);
        
        if (props.wrapperElement) {
            return props.wrapperElement(item, element);
        }
        return element;
    };

    const seperator = props.separator || <BreadcrumbsSeparator />;

    return (
        <NextBreadcrumbs separator={seperator}
            sx={{
                '& .MuiBreadcrumbs-li': {
                    display: 'flex',
                    alignItems: 'center',
                }
            }}
        >
            {props.items.map((item) => (
                getWrappedElement(item)
            ))}
        </NextBreadcrumbs>
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