export function generateValueInvestments(
  initialDate,
  initialValue,
  typeInvestments,
  daysBetween
) {
  return {
    type: '@investments/REQUEST_GENERATE_VALUE',
    payload: {
      initialDate,
      initialValue,
      typeInvestments,
      daysBetween,
    },
  };
}

export function defineGraph(
  initialDate,
  initialValue,
  finalValue,
  rentability,
  graphValue,
  graphGenerate,
  closedOptions,
  valueMajor
) {
  return {
    type: '@investments/ADD_TO_VALUE',
    payload: {
      initialDate,
      initialValue,
      finalValue,
      rentability,
      graphValue,
      graphGenerate,
      closedOptions,
      valueMajor,
    },
  };
}
export function resetGraph(closedOptions) {
  return {
    type: '@investments/RESET_VALUE',
    payload: {
      closedOptions,
    },
  };
}
