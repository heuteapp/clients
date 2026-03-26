import NextBreadcrumbs from "@mui/material/Breadcrumbs";
import { BreadcrumbsItem, BreadcrumbsProps } from "@/src/modules/ui-base/types/breadcrumbs.types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

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

    const seperator = props.separator || <NavigateNextIcon fontSize="small" />;

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