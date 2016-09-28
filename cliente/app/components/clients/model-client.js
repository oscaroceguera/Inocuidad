export function model (props) {
  let valid = false
  if (props.uuid) { valid = true }

  return {
    fields: {
      clientId: props.uuid,
      category: props.category || '',
      companyName: props.companyName || '',
      rfc: props.rfc || '',
      country: props.country || '',
      state: props.state || '',
      city: props.city || '',
      locality: props.locality || '',
      street: props.street || '',
      number: props.number || '',
      suburb: props.suburb || '',
      zipCode: props.zipCode || '',
      companyEmail: props.companyEmail || '',
      companyPhone: props.companyPhone || '',
      legalName: props.legalName || '',
      legalEmail: props.legalEmail || '',
      legalPhone: props.legalPhone || '',
      inChargeFSName: props.inChargeFSName || '',
      inChargeFSPhone: props.inChargeFSPhone || '',
      inChargeFSEmail: props.inChargeFSEmail || ''
    },
    validates: {
      companyName_valid: valid,
      rfc_valid: valid,
      country_valid: valid,
      state_valid: valid,
      city_valid: valid,
      street_valid: valid,
      legalName_valid: valid,
      legalEmail_valid: valid,
      legalPhone_valid: valid,
      companyPhone_valid: valid,
      companyEmail_valid: valid,
      inChargeFSName_valid: valid,
      inChargeFSPhone_valid: valid,
      inChargeFSEmail_valid: valid
    },
    showSubmit: valid
  }
}
