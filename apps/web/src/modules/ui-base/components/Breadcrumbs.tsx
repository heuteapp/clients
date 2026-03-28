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

//

export const BreadcrumbsAnimatedItem = ({ children, animation, shouldAnimate = true, index }: BreadcrumbsAnimatedItemProps) => {
    const variants = useMemo(() => {
        if (!shouldAnimate || animation.type === 'none') {
            return {
                hidden: { opacity: 1, x: 0, y: 0 },
                show: { opacity: 1, x: 0, y: 0 }
            };
        }

        const getOffset = () => {
            const offset = animation.offset ?? 10;
            switch (animation.direction) {
                case 'left': return { x: -offset, y: 0 };
                case 'right': return { x: offset, y: 0 };
                case 'up': return { x: 0, y: -offset };
                case 'down': return { x: 0, y: offset };
                default: return { x: -offset, y: 0 };
            }
        };

        const animations = {
            slide: {
                hidden: { opacity: 0, ...getOffset() },
                show: { opacity: 1, x: 0, y: 0 }
            },
            fade: {
                hidden: { opacity: 0 },
                show: { opacity: 1 }
            }
        };

        return animations[animation.type] || animations.slide;
    }, [shouldAnimate, animation.type, animation.direction, animation.offset]);

    const transition = useMemo(() => ({
        duration: animation.type !== 'none' ? (animation.duration ?? 0.2) : 0
    }), [animation.type, animation.duration]);
    
    if (!shouldAnimate || animation.type === 'none') {
        return <div>{children}</div>;
    }

    return (
        <motion.div
            variants={variants}
            custom={index}
            transition={transition}
        >
            {children}
        </motion.div>
    );
};