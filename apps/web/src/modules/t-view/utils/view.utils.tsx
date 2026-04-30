import { useMemo } from "react";
import { ViewParams, ViewProps, ViewState } from "../types/view.types";
import { SxProps, Theme } from "@mui/system";
import clsx from "clsx";

export const VIEW = <
  TProps extends ViewProps,
  const TState extends ViewState = TProps["state"]
> (render: (params: ViewParams<TState>) => React.ReactNode) => {
  return (props: TProps) => {
    const ref = props.ref || null;

    const state = props.state as TState;

    const impl = useMemo(() => {
      return {
        className: (...classNames: string[]) => {
          const overrideClassNames = props.overrides?.className || [];
          return clsx(...classNames, ...overrideClassNames);
        },
        style: (styles?: React.CSSProperties) => {
          const overrideStyles = props.overrides?.style || {};
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