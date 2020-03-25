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
  graphGenerate
) {
  return {
    type: '',
    payload: {
      initialDate,
      initialValue,
      finalValue,
      rentability,
      graphValue,
      graphGenerate,
    },
  };
}
