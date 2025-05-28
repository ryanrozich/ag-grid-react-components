import { useEffect } from 'react';
import { useDebounce } from './useDebounce';
import { parseDateExpression } from '../../../utils/dateExpressionParser';

interface UseDebouncedValidationProps {
  expressionFrom: string;
  expressionTo: string;
  filterMode: 'absolute' | 'relative';
  onFromValidityChange: (valid: boolean) => void;
  onToValidityChange: (valid: boolean) => void;
  onToErrorChange: (error: string) => void;
  validateToExpression: (expression: string) => { isValid: boolean; error: string };
  debounceDelay?: number;
}

/**
 * Custom hook that provides debounced validation for date expressions.
 * This prevents expensive validation from running on every keystroke.
 * 
 * @param props - Configuration for debounced validation
 */
export const useDebouncedValidation = ({
  expressionFrom,
  expressionTo,
  filterMode,
  onFromValidityChange,
  onToValidityChange,
  onToErrorChange,
  validateToExpression,
  debounceDelay = 300,
}: UseDebouncedValidationProps): void => {
  // Debounce the expression values to avoid validating on every keystroke
  const debouncedExpressionFrom = useDebounce(expressionFrom, debounceDelay);
  const debouncedExpressionTo = useDebounce(expressionTo, debounceDelay);

  // Validate from expression when it changes (debounced)
  useEffect(() => {
    if (filterMode !== 'relative') return;

    if (!debouncedExpressionFrom.trim()) {
      onFromValidityChange(true); // Empty is considered valid (no error state)
      return;
    }

    const parseResult = parseDateExpression(debouncedExpressionFrom);
    onFromValidityChange(parseResult.isValid);
  }, [debouncedExpressionFrom, filterMode, onFromValidityChange]);

  // Validate to expression when it changes (debounced)
  useEffect(() => {
    if (filterMode !== 'relative') return;

    if (!debouncedExpressionTo.trim()) {
      onToValidityChange(true); // Empty is considered valid
      onToErrorChange('');
      return;
    }

    const validationResult = validateToExpression(debouncedExpressionTo);
    onToValidityChange(validationResult.isValid);
    onToErrorChange(validationResult.error);
  }, [debouncedExpressionTo, filterMode, validateToExpression, onToValidityChange, onToErrorChange]);

  // Immediate validation for empty expressions (don't wait for debounce)
  useEffect(() => {
    if (filterMode !== 'relative') return;

    if (!expressionFrom.trim()) {
      onFromValidityChange(true);
    }
  }, [expressionFrom, filterMode, onFromValidityChange]);

  useEffect(() => {
    if (filterMode !== 'relative') return;

    if (!expressionTo.trim()) {
      onToValidityChange(true);
      onToErrorChange('');
    }
  }, [expressionTo, filterMode, onToValidityChange, onToErrorChange]);
};