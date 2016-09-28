export function model (props) {
  return {
    fields: {
      category: '',
      companyName: '',
      rfc: '',
      country: '',
      state: '',
      city: '',
      locality: '',
      street: '',
      number: '',
      suburb: '',
      zipCode: '',
      companyEmail: '',
      companyPhone: '',
      contactName: '',
      contactPhone: '',
      contactEmail: '',
      contactPosition: '',
      services: [],
      schema: '',
      certification: '',
      trainingTopic: '',
      numberPeople: '',
      hierarchicalLevel: '',
      aapAmonunt: '',
      aapProduct: '',
      aapPacked: '',
      aapNumberShelters: '',
      distNumberStores: '',
      distProducts: '',
      labCategory: '',
      labNom: '',
      labTest: '',
      appointment: '',
      comentaries: ''
    },
    validates: {
      companyName_valid: false,
      rfc_valid: false,
      country_valid: false,
      state_valid: false,
      city_valid: false,
      street_valid: false,
      companyPhone_valid: false,
      companyEmail_valid: false,
      contactName_valid: false,
      contactPhone_valid: false,
      contactEmail_valid: false,
      contactPosition_valid: false
    },
    validateTraining: {
      trainingTopic_valid: false,
      numberPeople_valid: false,
      hierarchicalLevel_valid: false
    },
    validateAap: {
      aapAmonunt_valid: false,
      aapProduct_valid: false,
      aapPacked_valid: false,
      aapNumberShelters_valid: false
    },
    validateDist: {
      distNumberStores_valid: false,
      distProducts_valid: false
    },
    validateLab: {
      labCategory_valid: false
    },
    showSubmit: false
  }
}
