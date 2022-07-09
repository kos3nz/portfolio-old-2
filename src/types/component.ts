import {
  getAllComponentPaths,
  getAllComponentRoutes,
  getComponentSources,
} from 'utils/components';

export type ComponentTemplate = {
  fileName: string;
  title: string;
  style?: React.CSSProperties;
  className?: string;
  Component: React.ComponentType<any>;
  ComponentProps?: any;
};

export type ComponentPaths = ReturnType<typeof getAllComponentPaths>;

export type ComponentRoutes = ReturnType<typeof getAllComponentRoutes>;

export type ComponentCodes = ReturnType<typeof getComponentSources>;
