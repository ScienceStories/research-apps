import RemoveCircleOutlineSharpIcon from '@mui/icons-material/RemoveCircleOutlineSharp';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { When } from 'react-if';

import openAILogo from '../../../assets/openai-logo.svg';
import wikidataLogo from '../../../assets/wikidata-logo.svg';
import { FactCheckerPropertyInstruction } from '../../../types';



interface FactCheckerConfigFormProps {
  apiKey: string;
  onApiKeyChange: (passage: string) => void;
  onPropertyInstructionsChange: (instructions: Array<FactCheckerPropertyInstruction>) => void;
  onWikibaseIdChange: (wikibaseId: string) => void;
  propertyInstructions: Array<FactCheckerPropertyInstruction>;
  wikibaseId?: string;
}

export default function FactCheckerConfigForm({
  apiKey,
  propertyInstructions,
  onApiKeyChange,
  onPropertyInstructionsChange,
  onWikibaseIdChange,
  wikibaseId,
}: FactCheckerConfigFormProps) {

  const handleApiKeyFieldChange: TextFieldProps['onChange'] = (e) => onApiKeyChange(e.target.value);
  const handlePropertyInstructionChange = (
    (index: number, field: 'prompt' | 'property_id'): TextFieldProps['onChange'] => (e) => {
      const newProps = [...propertyInstructions];
      newProps[index][field] = e.target.value;
      onPropertyInstructionsChange(newProps);
    }
  );
  const handleAddInstructionButtonClick = () => onPropertyInstructionsChange([
    ...propertyInstructions,
    { prompt: '', property_id: '' },
  ])
  const handleRemoveInstructionButtonClick = (index: number) => () => {
    onPropertyInstructionsChange(propertyInstructions.toSpliced(index, 1));
  }
  const handleWikibaseIdFieldChange: TextFieldProps['onChange'] = (e) => onWikibaseIdChange(e.target.value);

  return (
    <Grid
      container
      p={4}
      spacing={3}
    >
      <Grid md={7}>
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
      <Grid xs={12}>
        <When condition={!!propertyInstructions.length}>
          <Typography
            color="text.secondary"
            variant="h6"
          >
            Property Instructions
          </Typography>
          <Typography
            color="text.secondary"
            variant="subtitle1"
          >
            Configure and customize LLM instructions for each property.
          </Typography>
          <Box my={3}>
            {propertyInstructions?.map(({ prompt, property_id }, i) => (
              <Grid
                container
                key={i}
                spacing={5}
              >
                <Grid md={3}>
                  <TextField
                    fullWidth
                    helperText="Wikidata property"
                    label="Property Id"
                    onChange={handlePropertyInstructionChange(i, 'property_id')}
                    placeholder="P123"
                    value={property_id}
                  />
                </Grid>
                <Grid md={9}>
                  <TextField
                    fullWidth
                    helperText="custom instruction for the LLM to analyze the values of these property statements"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handleRemoveInstructionButtonClick(i)}
                            edge="end"
                          >
                            <RemoveCircleOutlineSharpIcon />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    label="Instruction"
                    multiline
                    onChange={handlePropertyInstructionChange(i, 'prompt')}
                    placeholder="Use this property to determine..."
                    value={prompt}
                    variant="filled"
                  />
                </Grid>
              </Grid>
            ))}
          </Box>
        </When>
        <Button
          onClick={handleAddInstructionButtonClick}
          size="small"
        >
          + Add Property Instruction
        </Button>
      </Grid>
    </Grid>
  );
}
