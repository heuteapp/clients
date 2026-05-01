import { useMemo } from "react";
import { ViewBaseProps, ViewParams, ViewPassParams, ViewProps, ViewRootProps, ViewSchema } from "../types/view.types";
import { SxProps, Theme } from "@mui/system";
import clsx from "clsx";
import React from "react";
import { createViewContext } from "./view.context";

export const VIEW = <
  const ID extends string = string, 
  const TSchema extends ViewSchema = ViewSchema
> (
  render: (params: ViewParams<ID, TSchema>) => React.ReactNode
) => {
  return (props: ViewProps<ID, TSchema>) => {
    return renderView(props.context, props, render);
  };
};

export const VIEWROOT = <
  const TSchema extends ViewSchema = ViewSchema
> (
  render: (params: ViewParams<"root", TSchema>) => React.ReactNode
) => {
  return (props: ViewRootProps<TSchema>) => {
    let context: TSchema["context"] | null = null;
    let Provider: React.FC<{ children: React.ReactNode }> | null = null;
    
    if (props.provider) {
      const ctx = createViewContext(props.provider);

      const fullContext = ctx.useContextValue();
      context = {
        state: fullContext.state,
        metrics: fullContext.metrics
      } as TSchema["context"];
      Provider = ctx.Provider;
    }
    
    const rendered = renderView(context, props, render);
    
    if (Provider) {
      return <Provider>{rendered}</Provider>;
    }
    
    return rendered;
  };
};

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
      };
    }, [props.overrides, props.children, context]);

    return render({ ref, context, state, impl });
};