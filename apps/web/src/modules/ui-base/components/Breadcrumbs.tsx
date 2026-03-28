import MUIBreadcrumbs from "@mui/material/Breadcrumbs";
import { BreadcrumbsAnimatedItemProps, BreadcrumbsItem, BreadcrumbsProps } from "@/src/modules/ui-base/types/breadcrumbs.types";
import Box from "@mui/material/Box";
import { motion } from "framer-motion";
import { useMemo } from "react";

export const Breadcrumbs = ({ items, separator, renderItem, ...props }: BreadcrumbsProps) => {
    const renderElement = (item: BreadcrumbsItem, index?: number) => {
        if (item.render) {
            const innerContent = item.render(item, index);
            
            if (renderItem) {
                return renderItem({ ...item, name: innerContent as string }, index);
            }
            
            return innerContent;
        }
        
        if (renderItem) {
            return renderItem(item, index);
        }
        
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
                separator={
                    <BreadcrumbsFlexRender>
                        {separator ? separator : <BreadcrumbsSeparator />}
                    </BreadcrumbsFlexRender>
                }
                {...props}
            >
                {items.map((item, index) => 
                    <BreadcrumbsFlexRender key={item.name}>
                        {renderElement(item, index)}
                    </BreadcrumbsFlexRender>
                )}
            </MUIBreadcrumbs>
        </Box>
    );
};

export const BreadcrumbsFlexRender = ({ children } : { children: React.ReactNode }) => {
    return (
        <Box 
            sx={{
                div: {
                    display: 'flex',
                    alignItems: 'center',
                },
            }}
        >
            {children}
        </Box>
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