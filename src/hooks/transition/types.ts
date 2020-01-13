export interface Properties {
  opacity?: number;
  transform?: string;
  height?: string;
  width?: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  marginTop?: string;
  marginRight?: string;
  marginLeft?: string;
  marginBottom?: string;
  strokeDashoffset?: number;
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
  marginTop?: MappedProperty;
  marginLeft?: MappedProperty;
  marginRight?: MappedProperty;
  marginBottom?: MappedProperty;
  strokeDashoffset?: MappedProperty;
}
