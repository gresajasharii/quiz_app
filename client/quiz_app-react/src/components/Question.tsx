import styles from '../styles/Quiz.module.css';
import { Radio, FormControlLabel, FormControl, FormLabel, RadioGroup } from '@mui/material';

interface QuestionProps {
  question: {
    id: number;
    question: string;
    options: string[];
  };
  selectedOption: string | null;
  onOptionChange: (option: string) => void;
}

export default function Question({ question, selectedOption, onOptionChange }: QuestionProps) {
  return (
    <div className={styles.questions}>
      <FormLabel component="legend" className={styles.questionText}>{question.question}</FormLabel>
      <FormControl component="fieldset">
        <RadioGroup
          name={`question-${question.id}`}
          value={selectedOption}
          onChange={(e) => onOptionChange(e.target.value)}
        >
          {question.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option}
              control={<Radio />}
              label={option}
              className={styles.optionItem}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
}