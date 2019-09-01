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

export type MappedProperties = {
  [P in keyof Properties]?: MappedProperty | MappedProperty[];
};
