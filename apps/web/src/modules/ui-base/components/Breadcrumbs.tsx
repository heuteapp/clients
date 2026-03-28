import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import { BreadcrumbsItem, BreadcrumbsProps } from "@/src/modules/ui-base/types/breadcrumbs.types";
import Box from "@mui/material/Box";

export const Breadcrumbs = ({ items, separator, renderItem, ...props }: BreadcrumbsProps) => {
    const renderElement = (item: BreadcrumbsItem) => {
        if (item.render) return item.render(item);
        if (renderItem) return renderItem(item);
        return item.name;
    };

    return (
        <Box
            sx={{
                '& li': {
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary',
                },
            }}
        >
            <MUIBreadcrumbs 
                separator={separator || <BreadcrumbsSeparator />}
                {...props}
            >
                {items.map((item) => 
                    <Box key={item.name}>
                        {renderElement(item)}
                    </Box>
                )}
            </MUIBreadcrumbs>
        </Box>
    );
};

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