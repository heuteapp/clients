import { useCallback, useMemo } from "react";
import { ViewParams, ViewProps } from "../types/view.types";

export const VIEW = <TProps extends ViewProps>(render: (params: ViewParams) => React.ReactNode) => {
  return (props: TProps) => {
    const ref = props.ref || null;

    const state = props.state;

    const overrides = useMemo(() => {
      return {
        classNames: props.classNames || [],
        styles: props.styles || {},
        sx: props.sx || {},
      };
    }, [props.classNames, props.styles, props.sx]);

    const content = useCallback((def?: () => React.ReactNode) => {
      if (props.children) {
        return props.children;
      }
      return def?.() || null;
    }, [props.children]);

    return render({ ref, state, overrides, content });
  };
};