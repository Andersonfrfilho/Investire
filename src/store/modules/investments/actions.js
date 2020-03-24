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
export function dataGraph() {
  return {
    type: '',
    payload: {},
  };
}
