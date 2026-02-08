export type VariationId = 'v1' | 'v2' | 'v3' | 'v4';

export interface VariationConfig {
  id: VariationId;
  name: string;
  subtitle: string;
  fontFamily: string;
  /** Google Fonts URL for the variation heading font */
  fontUrl: string;
}
