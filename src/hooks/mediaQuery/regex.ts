export const type = /(?:min|max)(?=Width)/;
export const breakpoint = /[(](?:min|max)Width: (\d+)px[)](?= (?:and|=>))/;
export const orientation = /[(]orientation: (landscape)[)]/;
export const value = /=> (\d+\.?\d+?)(?:px|vw)/;
export const unit = /=> \d+\.?\d+?(px|vw)/;
