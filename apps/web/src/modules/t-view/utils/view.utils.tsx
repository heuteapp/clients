import { useMemo } from "react";
import { ViewBaseProps, ViewParams, ViewPassParams, ViewProps, ViewRootProps, ViewSchema } from "../types/view.types";
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
    return renderView(props.context, props, render);
  };
};

export const VIEWROOT = <
  const TSchema extends ViewSchema = ViewSchema
> (
  _schema: TSchema,
  render: (params: ViewParams<"root", TSchema>) => React.ReactNode
) => {
  return (props: ViewRootProps<TSchema>) => {
    const context : TSchema["context"] = null!;

    return renderView(context, props, render);
  }
}

//

const renderView = <
  const ID extends string = string, 
  const TSchema extends ViewSchema = ViewSchema
> (
  context: TSchema["context"],
  props: ViewBaseProps<ID, TSchema>,
  render: (params: ViewParams<ID, TSchema>) => React.ReactNode
) => {
    const ref = props.ref || null;

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
        },
        pass: <PassID extends string>(params: ViewPassParams<PassID, TSchema>) => {
          return {
            context,
            key: params.key,
            state: params.state
          }
        }
      }
    }, [props.overrides, props.children, context]);

    return render({ ref, context, state, impl });
}