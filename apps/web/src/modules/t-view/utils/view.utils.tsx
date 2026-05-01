import { useMemo } from "react";
import { ViewParams, ViewProps, ViewRootProps, ViewSchema } from "../types/view.types";
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
    return renderView(props, render);
  };
};

let rootCounter = 0;

export const VIEWROOT = <
  const TSchema extends ViewSchema = ViewSchema
> (
  render: (params: ViewParams<"root", TSchema>) => React.ReactNode
) => {
  return (props: ViewRootProps<TSchema>) => {
    if (props.provider) {
      const uniqueId = `root_${++rootCounter}`;
      const { Provider } = createViewContext(uniqueId, props.provider as any);
      return <Provider>{render(props as any)}</Provider>;
    }
    
    return render(props as any);
  };
};

const renderView = <
  const ID extends string = string, 
  const TSchema extends ViewSchema = ViewSchema
> (
  props: ViewProps<ID, TSchema>,
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
        render: (def?: () => React.ReactNode) => {
          if (props.children) {
            return props.children;
          }
          return def?.() || null;
        }
      };
    }, [props.overrides, props.children,]);

    return render({ ref, state, impl } as ViewParams<ID, TSchema>);
};