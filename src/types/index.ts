export interface FactCheckerAnnotation {
  content: string;
  size: number;
  sources: Array<FactCheckerSource>;
  start: number;
  status: FactCheckerStatus;
  stop: number;
}

export type FactCheckerCoverage = {
  [K in FactCheckerStatus]: {
    count: number;
    size: number;
  }
}

export interface FactCheckerEntity {
  aliases: Array<string>;
  description?: string;
  id: string;
  image?: string;
  label: string;
  wikibase_url: string;
}

export interface FactCheckerExampleInput {
  description: string;
  passage: string;
  source: string;
  title: string;
}

export interface FactCheckerPropertyInstruction {
  prompt: string;
  property_id: string;
}

export interface FactCheckerReference {
  property: {
    id: string;
  };
  value: {
    description?: string;
    label: string;
  };
}

export interface FactCheckerRequest {
  api_key: string;
  entity_id?: string;
  passage: string;
  property_instructions?: Array<FactCheckerPropertyInstruction>;
}

export interface FactCheckerResponse {
  annotations: Array<FactCheckerAnnotation>;
  coverage: FactCheckerCoverage;
  entity: FactCheckerEntity;
}

export interface FactCheckerSource {
  description?: string;
  property_id: string;
  property_label: string;
  values: Array<FactCheckerSourceValue>;
  wikibase_url: string;
}

export interface FactCheckerSourceValue {
  description?: string;
  label: string;
  references: Array<FactCheckerReference>;
};

export type FactCheckerStatus = 'INVALID' | 'NO_STATUS' | 'UNKNOWN' | 'VALID';
