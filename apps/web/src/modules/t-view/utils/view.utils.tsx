import { useMemo } from "react";
import { ViewParams, ViewProps } from "../types/view.types";
import { SxProps, Theme } from "@mui/system";
import clsx from "clsx";

export const VIEW = <TProps extends ViewProps>(render: (params: ViewParams) => React.ReactNode) => {
  return (props: TProps) => {
    const ref = props.ref || null;

    const state = props.state;

    const impl = useMemo(() => {
      return {
        className: (...classNames: string[]) => {
          const overrideClassNames = props.overrides?.className || [];
          return clsx(...classNames, ...overrideClassNames);
        },
        styles: (styles?: React.CSSProperties) => {
          const overrideStyles = props.overrides?.styles || {};
          return { ...styles, ...overrideStyles };
        },
        sx: (sx?: SxProps<Theme>) => {
          const overrideSx = props.overrides?.sx || {};
          return { ...sx, ...overrideSx };
        },
        content: (def?: () => React.ReactNode) => {
          if (props.children) {
            return props.children;
          }
          return def?.() || null;
        }
      }
    }, [props.overrides]);

    return render({ ref, state, impl });
  };
};