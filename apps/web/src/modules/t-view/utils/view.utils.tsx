import { ViewParams, ViewProps } from "../types/view.types";

export const VIEW = <TProps extends ViewProps>(render: (params: ViewParams) => React.ReactNode) => {
  return (props: TProps) => {
    const content = (def: () => React.ReactNode) => {
      if (props.children) {
        return props.children;
      }
      return def();
    };

    return render({ props, content });
  };
};