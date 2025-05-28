import { useState, useEffect, useCallback } from "react";
import { IFloatingFilterParams } from "ag-grid-community";
// NOTE: In ag-grid v33, this is the correct import path
import { useGridFloatingFilter } from "ag-grid-react";
import { format } from "date-fns";
import { DateFilterModel } from "./interfaces";
import { logger } from "../utils/logger";

interface RelativeDateFloatingFilterParams extends IFloatingFilterParams {
  suppressFilterButton?: boolean;
  dateFormat?: string;
}

const DEFAULT_DATE_FORMAT = "yyyy-MM-dd";

const RelativeDateFloatingFilter = (
  props: RelativeDateFloatingFilterParams,
) => {
  const [displayValue, setDisplayValue] = useState<string>("");
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);
  const dateFormat = props.dateFormat || DEFAULT_DATE_FORMAT;

  // Update display when parent filter changes
  const onParentModelChanged = useCallback(
    (parentModel: DateFilterModel | null) => {
      logger.debug("Floating filter received parent model:", parentModel);

      if (!parentModel) {
        setDisplayValue("");
        setIsFilterActive(false);
        return;
      }

      // Mark filter as active - this will trigger the visual indicator
      setIsFilterActive(true);

      const {
        type,
        mode,
        dateFrom,
        dateTo,
        expressionFrom,
        expressionTo,
        fromInclusive,
        toInclusive,
      } = parentModel;

      // Default to false if not specified
      const isFromInclusive = fromInclusive ?? false;
      const isToInclusive = toInclusive ?? false;

      let typeText = "";
      switch (type) {
        case "equals":
          typeText = "=";
          break;
        case "notEqual":
          typeText = "≠";
          break;
        case "after":
          typeText = isFromInclusive ? "≥" : ">";
          break;
        case "before":
          typeText = isToInclusive ? "≤" : "<";
          break;
        case "inRange":
          typeText = "";
          break;
      }

      if (mode === "absolute") {
        if (type === "inRange") {
          const fromText = dateFrom ? format(dateFrom, dateFormat) : "";
          const toText = dateTo ? format(dateTo, dateFormat) : "";

          if (fromText && toText) {
            const fromBracket = isFromInclusive ? "[" : "(";
            const toBracket = isToInclusive ? "]" : ")";
            setDisplayValue(
              `${fromBracket}${fromText} to ${toText}${toBracket}`,
            );
          } else if (fromText) {
            setDisplayValue(`${isFromInclusive ? "≥" : ">"} ${fromText}`);
          } else if (toText) {
            setDisplayValue(`${isToInclusive ? "≤" : "<"} ${toText}`);
          } else {
            setDisplayValue("");
            setIsFilterActive(false);
          }
        } else {
          setDisplayValue(
            dateFrom ? `${typeText} ${format(dateFrom, dateFormat)}` : "",
          );
        }
      } else {
        // Relative mode
        if (type === "inRange") {
          if (expressionFrom && expressionTo) {
            const fromBracket = isFromInclusive ? "[" : "(";
            const toBracket = isToInclusive ? "]" : ")";
            setDisplayValue(
              `${fromBracket}${expressionFrom} to ${expressionTo}${toBracket}`,
            );
          } else if (expressionFrom) {
            setDisplayValue(`${isFromInclusive ? "≥" : ">"} ${expressionFrom}`);
          } else if (expressionTo) {
            setDisplayValue(`${isToInclusive ? "≤" : "<"} ${expressionTo}`);
          } else {
            setDisplayValue("");
            setIsFilterActive(false);
          }
        } else {
          setDisplayValue(
            expressionFrom ? `${typeText} ${expressionFrom}` : "",
          );
        }
      }
    },
    [dateFormat],
  );

  // Called after the GUI has been attached
  const afterGuiAttached = useCallback(() => {
    logger.debug("Floating filter GUI attached");
    // No specific initialization needed
  }, []);

  // Register with AG Grid with required callbacks
  useGridFloatingFilter({
    afterGuiAttached,
  });

  // Initial update when component mounts or when model changes
  useEffect(() => {
    if (props.currentParentModel) {
      onParentModelChanged(
        props.currentParentModel as unknown as DateFilterModel,
      );
    } else {
      setIsFilterActive(false);
      setDisplayValue("");
    }
  }, [props.currentParentModel, onParentModelChanged]);

  // Debug logging
  logger.debug("RelativeDateFloatingFilter rendering, props:", props);

  return (
    <div
      className="ag-floating-filter-body"
      data-testid="relative-date-floating-filter"
    >
      <div
        className="ag-floating-filter-input text-sm"
        style={{ display: "flex", alignItems: "center" }}
      >
        {isFilterActive ? (
          <div className="active-filter flex items-center">
            <span
              className="filter-indicator"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#4F46E5",
                marginRight: "6px",
              }}
            />
            <span style={{ fontWeight: "500" }}>{displayValue}</span>
          </div>
        ) : (
          <span style={{ marginLeft: "4px", color: "#6B7280" }}>No filter</span>
        )}
      </div>
    </div>
  );
};

export default RelativeDateFloatingFilter;
