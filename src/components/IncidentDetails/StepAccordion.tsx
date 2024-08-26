import React from 'react';
import { makeStyles, tokens, AccordionItem, AccordionHeader, AccordionPanel, Text } from '@fluentui/react-components';

const useStyles = makeStyles({
  stepHeader: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '8px',
  },
  stepProgress: {
    color: tokens.colorNeutralForeground3,
  },
  stepAccordion: {
    backgroundColor: tokens.colorNeutralBackground6,
  }
});

interface StepAccordionProps {
  value: string;
  headerText: string;
  progressText: string;
  children: React.ReactNode;
}

const StepAccordion: React.FC<StepAccordionProps> = ({ value, headerText, progressText, children }) => {
  const classes = useStyles();

  return (
    <AccordionItem value={value}>
      <AccordionHeader size='large' className={classes.stepAccordion}>
        <div className={classes.stepHeader}>
          {headerText} <Text className={classes.stepProgress}>{progressText}</Text>
        </div>
      </AccordionHeader>
      <AccordionPanel>
        <div>{children}</div>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default StepAccordion;
