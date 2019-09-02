export interface Properties {
  opacity?: number;
  transform?: string;
}

export interface MappedProperty {
  function?: string;
  initialValue: number;
  targetValue: number;
  unit?: string;
}

export interface MappedProperties {
  opacity?: MappedProperty;
  transform?: MappedProperty | MappedProperty[];
}
