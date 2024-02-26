import beatriceHill from '../../data/fact-checker/inputs/beatrice-hill.json';
import chienShiungWu from '../../data/fact-checker/inputs/chien-shiung-wu.json';
import erinOShea from '../../data/fact-checker/inputs/erin-oshea.json';
import evaTardos from '../../data/fact-checker/inputs/eva-tardos.json';
import graceHopper from '../../data/fact-checker/inputs/grace-hopper.json';
import margaretMead from '../../data/fact-checker/inputs/margaret-mead.json';
import marthaLudwig from '../../data/fact-checker/inputs/martha-ludwig.json';
import maryamMirzakhani from '../../data/fact-checker/inputs/maryam-mirzakhani.json';
import { FactCheckerExampleInput, FactCheckerStatus } from '../types';


export const {
  STORIES_SERVICES_API_BASE_URL,
  STORIES_SERVICES_DISABLED,
} = process.env;

export const factCheckerExampleInputs: Array<FactCheckerExampleInput> = [
  maryamMirzakhani,
  graceHopper,
  beatriceHill,
  chienShiungWu,
  erinOShea,
  evaTardos,
  margaretMead,
  marthaLudwig,
];

export const FactCheckerStatusColorMap: Record<FactCheckerStatus, undefined | 'primary' | 'error' | 'success' | 'warning'> = {
  INVALID: 'error',
  NO_STATUS: undefined,
  VALID: 'success',
  UNKNOWN: 'warning',
}

export const scienceStoriesURL = 'https://sciencestories.io';

const _envBool = (envVar: string | undefined) => envVar?.toLowerCase() === 'true';

export const storiesServicesAPIIsEnabled = !_envBool(STORIES_SERVICES_DISABLED) && !!STORIES_SERVICES_API_BASE_URL

export const WikidataPropId = {
  importedFromWikimediaProject: 'P143',
  inferredFrom: 'P3452',
  referenceURL: 'P854',
  statedIn: 'P248',
} as const;

export type WikidataPropIdType = typeof WikidataPropId[keyof typeof WikidataPropId]

export const URLValueWikidataPropIds = new Set<WikidataPropIdType>([
  WikidataPropId.referenceURL,
])

export const WikidataPropLabel: Record<WikidataPropIdType, string> = {
  [WikidataPropId.importedFromWikimediaProject]: 'Stated in',
  [WikidataPropId.inferredFrom]: 'Inferred from',
  [WikidataPropId.referenceURL]: 'URL',
  [WikidataPropId.statedIn]: 'Stated in'
}
