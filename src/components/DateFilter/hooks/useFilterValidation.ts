import { useMemo, useCallback } from "react";
import { DateFilterType, DateFilterMode } from "../types";
import {
  parseDateExpression,
  resolveDateExpression,
} from "../../../utils/dateExpressionParser";

interface UseFilterValidationProps {
  filterType: DateFilterType;
  filterMode: DateFilterMode;
  absoluteDateFrom: Date | null;
  absoluteDateTo: Date | null;
  expressionFrom: string;
  expressionTo: string;
  fromExpressionValid: boolean;
  toExpressionValid: boolean;
}

interface UseFilterValidationReturn {
  isFilterValid: boolean;
  resolvedDateFrom: Date | null;
  resolvedDateTo: Date | null;
  effectiveDateFrom: Date | null;
  effectiveDateTo: Date | null;
  validateToExpression: (expression: string) => {
    isValid: boolean;
    error: string;
    resolvedDate: Date | null;
  };
}

export const useFilterValidation = ({
  filterType,
  filterMode,
  absoluteDateFrom,
  absoluteDateTo,
  expressionFrom,
  expressionTo,
  fromExpressionValid,
  toExpressionValid,
}: UseFilterValidationProps): UseFilterValidationReturn => {
  // Resolved dates based on expressions
  const resolvedDateFrom = useMemo(() => {
    if (filterMode === "relative" && expressionFrom) {
      const resolved = resolveDateExpression(expressionFrom);
      console.log(
        `[useFilterValidation] Resolved expressionFrom "${expressionFrom}" to:`,
        resolved,
      );
      return resolved;
    }
    return null;
  }, [filterMode, expressionFrom]);

  const resolvedDateTo = useMemo(() => {
    if (filterMode === "relative" && expressionTo) {
      const resolved = resolveDateExpression(expressionTo);
      console.log(
        `[useFilterValidation] Resolved expressionTo "${expressionTo}" to:`,
        resolved,
      );
      return resolved;
    }
    return null;
  }, [filterMode, expressionTo]);

  // Effective dates (either absolute or resolved from expressions)
  const effectiveDateFrom = useMemo(() => {
    return filterMode === "absolute" ? absoluteDateFrom : resolvedDateFrom;
  }, [filterMode, absoluteDateFrom, resolvedDateFrom]);

  const effectiveDateTo = useMemo(() => {
    return filterMode === "absolute" ? absoluteDateTo : resolvedDateTo;
  }, [filterMode, absoluteDateTo, resolvedDateTo]);

  // Validate "to" expression with additional business logic
  const validateToExpression = useCallback(
    (expression: string) => {
      const parseResult = parseDateExpression(expression);
      if (!parseResult.isValid) {
        return {
          isValid: false,
          error: "Invalid expression",
          resolvedDate: null,
        };
      }

      const resolvedDate = resolveDateExpression(expression);

      // Additional validation for range filters
      if (filterType === "inRange" && expressionFrom && expression) {
        const fromDate = resolveDateExpression(expressionFrom);

        if (fromDate && resolvedDate && resolvedDate <= fromDate) {
          return {
            isValid: false,
            error: "End date must be after start date",
            resolvedDate: null,
          };
        }
      }

      return { isValid: true, error: "", resolvedDate };
    },
    [filterType, expressionFrom],
  );

  // Overall filter validity
  const isFilterValid = useMemo(() => {
    if (filterMode === "absolute") {
      // For absolute mode, we need at least one date
      if (filterType === "inRange") {
        return effectiveDateFrom !== null && effectiveDateTo !== null;
      }
      return effectiveDateFrom !== null;
    } else {
      // For relative mode, check expression validity
      if (filterType === "inRange") {
        return Boolean(
          expressionFrom &&
            expressionTo &&
            fromExpressionValid &&
            toExpressionValid &&
            resolvedDateFrom !== null &&
            resolvedDateTo !== null,
        );
      }
      return Boolean(
        expressionFrom && fromExpressionValid && resolvedDateFrom !== null,
      );
    }
  }, [
    filterMode,
    filterType,
    effectiveDateFrom,
    effectiveDateTo,
    expressionFrom,
    expressionTo,
    fromExpressionValid,
    toExpressionValid,
    resolvedDateFrom,
    resolvedDateTo,
  ]);

  return {
    isFilterValid,
    resolvedDateFrom,
    resolvedDateTo,
    effectiveDateFrom,
    effectiveDateTo,
    validateToExpression,
  };
};
