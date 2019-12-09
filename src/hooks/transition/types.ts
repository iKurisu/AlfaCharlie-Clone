export enum Types {
  opacity = "opacity",
  transform = "transform",
  height = "height",
  width = "width",
  top = "top",
  left = "left",
  right = "right",
  bottom = "bottom"
}

export interface Properties {
  opacity?: number;
  transform?: string;
  height?: string;
  width?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
}

export interface MappedProperty {
  function?: string;
  initialValue: number;
  targetValue: number;
  unit?: string;
}

export interface MappedProperties {
  opacity?: MappedProperty;
  transform?: MappedProperty[];
  height?: MappedProperty;
  width?: MappedProperty;
  top?: MappedProperty;
  left?: MappedProperty;
  right?: MappedProperty;
  bottom?: MappedProperty;
}
