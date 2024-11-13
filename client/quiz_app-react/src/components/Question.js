import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styles from '../styles/Quiz.module.css';
import { Radio, FormControlLabel, FormControl, FormLabel, RadioGroup } from '@mui/material';
export default function Question({ question, selectedOption, onOptionChange }) {
    return (_jsxs("div", { className: styles.questions, children: [_jsx(FormLabel, { component: "legend", className: styles.questionText, children: question.question }), _jsx(FormControl, { component: "fieldset", children: _jsx(RadioGroup, { name: `question-${question.id}`, value: selectedOption, onChange: (e) => onOptionChange(e.target.value), children: question.options.map((option, index) => (_jsx(FormControlLabel, { value: option, control: _jsx(Radio, {}), label: option, className: styles.optionItem }, index))) }) })] }));
}
