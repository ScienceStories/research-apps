import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';

import openAILogo from '../../../assets/openai-logo.svg';
import wikidataLogo from '../../../assets/wikidata-logo.svg';


interface FactCheckerConfigFormProps {
  apiKey: string;
  onApiKeyChange: (passage: string) => void;
  onWikibaseIdChange: (wikibaseId: string) => void;
  wikibaseId?: string;
}

export default function FactCheckerConfigForm({
  apiKey,
  onApiKeyChange,
  onWikibaseIdChange,
  wikibaseId,
}: FactCheckerConfigFormProps) {

  const handleApiKeyFieldChange: TextFieldProps['onChange'] = (e) => onApiKeyChange(e.target.value);
  const handleWikibaseIdFieldChange: TextFieldProps['onChange'] = (e) => onWikibaseIdChange(e.target.value);

  return (
    <Grid
      container
      spacing={3}
    >
      <Grid
        sx={{ textAlign: 'left' }}
        md={7}
      >
        <TextField
          autoComplete="off"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ '& img': { opacity: 0.5, width: 25 }}}
              >
                <img
                  alt="OpenAI"
                  src={openAILogo}
                />
              </InputAdornment>
            ),
          }}
          label="OpenAI API Key"
          onChange={handleApiKeyFieldChange}
          placeholder="sk-1234"
          required
          value={apiKey}
        />
      </Grid>
      <Grid md={5}>
        <TextField
          helperText="(optional) Use this if the fact-checker is unable to find the main subject's wikibase item"
          InputProps={{
            startAdornment: (
              <InputAdornment
                position="start"
                sx={{ '& img': { opacity: 0.5, width: 25 }}}
              >
                <img
                  alt="Wikidata"
                  src={wikidataLogo}
                />
              </InputAdornment>
            ),
          }}
          label="Wikidata Id"
          onChange={handleWikibaseIdFieldChange}
          placeholder="Q1234"
          value={wikibaseId}
        />
      </Grid>
    </Grid>
  );
}
