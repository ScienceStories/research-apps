import { storiesServicesAPIIsEnabled } from '../constants';
import factCheckerResponse from '../tests/fixures/fact-checker--grace-hopper.json';
import { FactCheckerRequest, FactCheckerResponse } from '../types';
import { sleep } from '../utils/factChecker';
import apiClient from './client';


export const aiFactCheck = async (request: FactCheckerRequest): Promise<FactCheckerResponse> => {
  if (storiesServicesAPIIsEnabled) {
    return apiClient.post('ai/fact_checker/', request);
  }
  await sleep(3000); // Mocked Response
  return factCheckerResponse as FactCheckerResponse;
}
