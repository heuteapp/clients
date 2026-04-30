import { useMemo } from "react";
import { ViewParams, ViewProps, ViewSchema } from "../types/view.types";
import { SxProps, Theme } from "@mui/system";
import clsx from "clsx";

export const VIEW = <
  const ID extends string = string, 
  const TSchema extends ViewSchema = ViewSchema
> (
  _: {
    id: ID;
    schema: TSchema;
  },
  render: (params: ViewParams<ID, TSchema>) => React.ReactNode
) => {
  return (props: ViewProps<ID, TSchema>) => {
    const ref = props.ref || null;

    const context = props.context as TSchema["context"];
    const state = props.state as TSchema["states"][ID];

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

    return render({ ref, context, state, impl });
  };
};