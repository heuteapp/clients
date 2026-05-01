import { useMemo } from "react";
import { ViewBaseProps, ViewParams, ViewPassParams, ViewProps, ViewRootProps, ViewSchema, ViewUse } from "../types/view.types";
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
    return renderView(props.use, props, render);
  };
};

export const VIEWROOT = <
  const TSchema extends ViewSchema = ViewSchema
> (
  render: (params: ViewParams<"root", TSchema>) => React.ReactNode
) => {
  return (props: ViewRootProps<TSchema>) => {
    const ctx = useMemo(() => createViewContext(props.provider), [props.provider]);
    const rendered = renderView(ctx.use, props, render);
    
    return <ctx.Provider>{rendered}</ctx.Provider>;
  };
};

const renderView = <
  const ID extends string = string, 
  const TSchema extends ViewSchema = ViewSchema
> (
  use: ViewUse | null,
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
          const p = {
            key: params.key,
            state: params.state
          } as any;

          if(use) {
            p.use = use;
          }

          return p;
        }
      };
    }, [props.overrides, props.children, use]);

    const params = { ref, state, impl } as any;
    if (use) {
      params.use = use;
    }

    return render(params as ViewParams<ID, TSchema>);
};