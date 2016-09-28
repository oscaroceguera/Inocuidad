export function model (props) {
  let valid = false
  if (props.uuid) { valid = true }

  return {
    fields: {
      labId: props.uuid,
      labName: props.labName || '',
      country: props.country || '',
      state: props.state || '',
      city: props.city || '',
      locality: props.locality || '',
      street: props.street || '',
      number: props.number || '',
      neighborhood: props.neighborhood || '',
      zipCode: props.zipCode || '',
      latitude: props.latitude || '',
      longitude: props.longitude || '',
      phone: props.phone || '',
      labBranch: props.labBranch || '',
      nomImplent: props.nomImplent || '',
      nomWillImplement: props.nomWillImplement || '',
      analysis: props.analysis || '',
      analysisWillAcredit: props.analysisWillAcredit || '',
      employeeBase: props.employeeBase || '',
      employeeEventual: props.employeeEventual || '',
      labAreas: props.labAreas || ''
    },
    validates: {
      labName_valid: valid,
      country_valid: valid,
      state_valid: valid,
      city_valid: valid,
      street_valid: valid,
      labBranch_valid: valid,
      nomImplent_valid: valid,
      analysis_valid: valid,
      labAreas_valid: valid
    },
    showSubmit: valid
  }
}
