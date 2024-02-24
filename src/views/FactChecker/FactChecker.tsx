import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined';
import DifferenceOutlinedIcon from '@mui/icons-material/DifferenceOutlined';
import SettingsSuggestOutlinedIcon from '@mui/icons-material/SettingsSuggestOutlined';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import { When } from 'react-if';

import { aiFactCheck } from '../../api';
import FactCheckerConfigForm from
  '../../components/containers/FactCheckerConfigForm/FactCheckerConfigForm';
import FactCheckerPassageForm from
  '../../components/containers/FactCheckerPassageForm/FactCheckerPassageForm';
import FactCheckerAnnotatedPassageContainer from
  '../../components/containers/FactCheckerAnnotatedPassageContainer/FactCheckerAnnotatedPassageContainer';
import MainLayout from '../../layouts/MainLayout/MainLayout';
import { FactCheckerResponse } from '../../types';


export default function FactChecker() {
  const [apiKey, setApiKey] = useState('');
  const [passage, setPassage] = useState('');
  const [wikibaseId, setWikibaseId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);
  const [configPanelExpanded, setconfigPanelExpanded] = useState(true);
  const [passagePanelExpanded, setPassagePanelExpanded] = useState(true);
  const [data, setData] = useState<FactCheckerResponse>();

  const needsAPIKey = !apiKey;
  const needsTextPassage = !passage;
  const disabled = needsAPIKey || needsTextPassage;
  const showResultsPanel = !!data;

  const handleConfigFormApiKeyChange = (newApiKey: string) => setApiKey(newApiKey);
  const handleConfigFormWikibaseIdChange = (newWikibaseId: string) => setWikibaseId(newWikibaseId);
  const handleConfigPanelChange = () => setconfigPanelExpanded(!configPanelExpanded);
  const handlePassagePanelChange = () => setPassagePanelExpanded(!passagePanelExpanded);
  const handlePassageFormChange = (newPassage: string) => setPassage(newPassage);
  const handleSubmit = async () => {
    setLoading(true);
    setconfigPanelExpanded(false);
    try {
      const factCheckerResponse = await aiFactCheck({
        api_key: apiKey,
        passage,
        wikibase_id: wikibaseId || undefined,
      })
      setData(factCheckerResponse);
      setPassagePanelExpanded(false);
    } catch(e) {
      alert('There was an issue processing this passage.');
      console.error(e);
    }
    setLoading(false);
  }

  return (
    <MainLayout title="Wikidata LLM Fact-Checker">
      <Grid
        container
        justifyContent="center"
        maxWidth={1200}
        mb={5}
        mx="auto"
        p={8}
        spacing={3}
      >
        <Grid xs={12}>
          <Accordion
            expanded={configPanelExpanded}
            onChange={handleConfigPanelChange}
            square
          >
            <AccordionSummary>
              <SettingsSuggestOutlinedIcon />
              <Typography
                pl={1}
                variant="h5"
              >
                Configuration Settings
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FactCheckerConfigForm
                apiKey={apiKey}
                onApiKeyChange={handleConfigFormApiKeyChange}
                onWikibaseIdChange={handleConfigFormWikibaseIdChange}
                wikibaseId={wikibaseId}
              />
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={passagePanelExpanded}
            onChange={handlePassagePanelChange}
            square
          >
            <AccordionSummary>
              <DifferenceOutlinedIcon />
              <Typography pl={1}>
                Passage Text
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FactCheckerPassageForm
                disabled={disabled}
                loading={loading}
                onChange={handlePassageFormChange}
                onSubmit={handleSubmit}
                passage={passage}
              />
            </AccordionDetails>
          </Accordion>
          <When condition={loading}>
            <Grid m={2}>
              <Typography
                className="loading"
                color="text.secondary"
                fontWeight={300}
                variant="subtitle1"
              >
                Generating AI Response
              </Typography>
            </Grid>
          </When>
          <When condition={showResultsPanel}>
            <Accordion
              defaultExpanded
              square
              sx={({ palette}) => ({ bgcolor: palette.background.grey })}
            >
              <AccordionSummary>
                <AutoFixHighOutlinedIcon />
                <Typography paddingLeft={1}>
                  AI-Generated Results
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FactCheckerAnnotatedPassageContainer data={data} />
              </AccordionDetails>
            </Accordion>
          </When>
        </Grid>
      </Grid>
    </MainLayout>
  );
}
