export interface FactCheckerExampleInput {
  description: string;
  passage: string;
  title: string;
  source: string;
}

export interface FactCheckerEntity {
  aliases: Array<string>;
  description?: string;
  id: string;
  image?: string;
  label: string;
  wikibase_url: string;
}

export type FactCheckerCoverage = {
  [K in FactCheckerStatus]: {
    count: number;
    size: number;
  }
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

export interface FactCheckerSource {
  description?: string;
  id: string;
  label: string;
  values: Array<FactCheckerSourceValue>;
  wikibase_url: string;
}

export interface FactCheckerSourceValue {
  description?: string;
  label: string;
  references: Array<FactCheckerReference>;
};

export type FactCheckerStatus = 'INVALID' | 'NO_STATUS' | 'UNKNOWN' | 'VALID'

export interface FactCheckerAnnotation {
  content: string;
  size: number;
  sources: Array<FactCheckerSource>;
  start: number;
  status: FactCheckerStatus;
  stop: number;
}

export interface FactCheckerRequest {
  api_key: string;
  passage: string;
  wikibase_id?: string;
}

export interface FactCheckerResponse {
  annotations: Array<FactCheckerAnnotation>;
  coverage: FactCheckerCoverage;
  entity: FactCheckerEntity;
}
