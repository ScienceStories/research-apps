import OpenInNewSharpIcon from '@mui/icons-material/OpenInNewSharp';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';

import { factCheckerExampleInputs } from '../../../constants';


interface FactCheckerPassageFormProps {
  disabled?: boolean;
  loading?: boolean;
  onChange: (passage: string) => void;
  onSubmit: () => void;
  passage: string;
}

export default function FactCheckerPassageForm({
  disabled,
  loading,
  onChange,
  onSubmit,
  passage,
}: FactCheckerPassageFormProps) {
  const [exampleIndex, setExampleIndex] = useState<number | string>('');

  const handleExampleSelectChange = (event: SelectChangeEvent) => {
    const index = event.target.value;
    setExampleIndex(index);
    if (typeof index === 'number') {
      const example = factCheckerExampleInputs[index];
      onChange(example.passage);
    }
  }
  const handleTextFieldChange: TextFieldProps['onChange'] = (e) => {
    onChange(e.target.value);
    setExampleIndex('');
  }
  const handleSubmitButtonClick = () => {
    if (disabled) {
      throw Error('The form is not valid');
    }
    onSubmit();
  }

  return (
    <Grid
      container
      direction="column"
      p={4}
      spacing={5}
    >
      <Grid>
        <FormControl fullWidth>
          <InputLabel>
            Example Passages
          </InputLabel>
          <Select
            label="Example Passages"
            onChange={handleExampleSelectChange}
            value={exampleIndex as string}
          >
            {factCheckerExampleInputs.map(({ description, source, title }, i) => (
              <MenuItem
                key={title}
                value={i}
              >
                <Grid
                  container
                  justifyContent="space-between"
                  width="100%"
                >
                  <Grid>
                    <Typography
                      display="inline-block"
                      mr={1}
                      variant="body1"
                    >
                      {title}
                    </Typography>
                    <Typography
                      color="text.secondary"
                      lineHeight={1}
                      variant="caption"
                    >
                      {description}
                    </Typography>
                  </Grid>
                  <Grid>
                    <IconButton
                      href={source}
                      size="small"
                      target="_blank"
                      title="Source Link"
                    >   <OpenInNewSharpIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            Choose from our example test cases
          </FormHelperText>
        </FormControl>
      </Grid>
      <Grid>
        <TextField
          disabled={loading}
          fullWidth
          helperText="Paste a passage from a biography or claim made about someone that can be verified."
          maxRows={35}
          multiline
          onChange={handleTextFieldChange}
          placeholder="Or paste a passage here..."
          value={passage}
        />
      </Grid>
      <Grid>
        <LoadingButton
          disabled={disabled}
          loading={loading}
          onClick={handleSubmitButtonClick}
          variant="contained"
        >
          Generate Fact-Checker 
        </LoadingButton>
      </Grid>
    </Grid>
  );
}
