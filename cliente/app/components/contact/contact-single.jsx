import React from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
// Actions
import { fetchCatalogs } from '../../actions/catalogs'
import { createContact } from '../../actions/contacts'
// Material-ui
import RaisedButton from 'material-ui/lib/raised-button'
// Commons
import * as styles from '../commons/styles'
import SubmenuBar from '../commons/submenu-bar.jsx'
import * as aux from '../commons/aux-functions'
import { model } from './model'
import {
	AGRICOLA,
	ACUICOLA,
	DISTRIBUIDORA,
	PROCESADORA,
	LABORATORIO
} from '../commons/categories'
// Singles
import Category from './singles/category.jsx'
import General from './singles/general.jsx'
import Contact from './singles/contact.jsx'
import Service from './singles/service.jsx'
import AAP from './singles/AAP.jsx'
import Distributor from './singles/distributor.jsx'
import Laboratory from './singles/laboratory.jsx'
import Comment from './singles/comment.jsx'

const BAR_MENU = {
  title: 'Registrar contacto',
  avatar: 'mdi mdi-email',
  path: '/contacts'
}

const ContactSingle = React.createClass({

  getInitialState () {
    let state = model(this.props)
    return state
  },

  componentWillMount () {
    this.props.fetchCatalogs()
  },

  _onChange (value, key) {
    let obj = this.state.fields
    obj[key] = value
    this.setState(obj)

    let country = key === 'country'
    let state = key === 'state'
    let city = key === 'city'

    if (country || state || city) {
      let localities = aux.validLocalities(key, this.state.validates)
      this.setState(localities)
    }
  },

  // LinkState with validate fields option
  // key: it's a field name; section: section; required: field required; type: validate type
  linkContactState (key, section = null, required = false, type = null) {
    return {
      value: this.state.fields[key],
      requestChange: (value) => {
        let obj = this.state.fields
        obj[key] = value
        this.setState(obj)

        if (required) {
          this._validates(section, key, type)
        }
      }
    }
  },

  _validates (section, item, type) {
    let sectionState = this.state[section]
    let itemState = this.state.fields[item]

    let itemValid = aux.validateSections(sectionState, item, itemState, type)

    this.setState(itemValid)
  },

  _getValueLinks () {
    return {
      general: {
        companyName: this.linkContactState('companyName', 'validates', true, 'text'),
        rfc: this.linkContactState('rfc', 'validates', true, 'rfc'),
        locality: this.linkContactState('locality'),
        street: this.linkContactState('street', 'validates', true, 'text'),
        number: this.linkContactState('number'),
        suburb: this.linkContactState('suburb'),
        zipCode: this.linkContactState('zipCode'),
        companyEmail: this.linkContactState('companyEmail', 'validates', true, 'email'),
        companyPhone: this.linkContactState('companyPhone', 'validates', true, 'text')
      },
      contact: {
        contactName: this.linkContactState('contactName', 'validates', true, 'text'),
        contactPhone: this.linkContactState('contactPhone', 'validates', true, 'text'),
        contactEmail: this.linkContactState('contactEmail', 'validates', true, 'email'),
        contactPosition: this.linkContactState('contactPosition', 'validates', true, 'text')
      },
      service: {
        schema: this.linkContactState('schema'),
        certification: this.linkContactState('certification'),
        trainingTopic: this.linkContactState('trainingTopic', 'validateTraining', true, 'text'),
        numberPeople: this.linkContactState('numberPeople', 'validateTraining', true, 'numberCount'),
        hierarchicalLevel: this.linkContactState('hierarchicalLevel', 'validateTraining', true, 'text')
      },
      app: {
        aapAmonunt: this.linkContactState('aapAmonunt', 'validateAap', true, 'text'),
        aapProduct: this.linkContactState('aapProduct', 'validateAap', true, 'text'),
        aapPacked: this.linkContactState('aapPacked', 'validateAap', true, 'text'),
        aapNumberShelters: this.linkContactState('aapNumberShelters', 'validateAap', true, 'numberCount')
      },
      distributor: {
        distNumberStores: this.linkContactState('distNumberStores', 'validateDist', true, 'numberCount'),
        distProducts: this.linkContactState('distProducts', 'validateDist', true, 'text')
      },
      laboratory: {
        labCategory: this.linkContactState('labCategory', 'validateLab', true, 'text'),
        labNom: this.linkContactState('labNom'),
        labTest: this.linkContactState('labTest')
      },
      comment: {
        appointment: this.linkContactState('appointment'),
        comentaries: this.linkContactState('comentaries')
      }
    }
  },

  _categoryFields () {
    let valueLinks = this._getValueLinks()
    let category = this.state.category
    if (category === AGRICOLA || category === ACUICOLA || category === PROCESADORA) {
      return <AAP title={category} valueLinks={valueLinks['app']} errorText={this._errorText}/>
    } else if (category === DISTRIBUIDORA) {
      return <Distributor valueLinks={valueLinks['distributor']} errorText={this._errorText}/>
    } else if (category === LABORATORIO) {
      return <Laboratory valueLinks={valueLinks['laboratory']} errorText={this._errorText}/>
    }
  },

  _errorText (section, validItem, requiredType) {
    let state = this.state[section][validItem]
    return aux.errorTextSelect(state, requiredType)
  },

  _showSubmit () {
    let {
      validates,
      fields,
      validateTraining,
      validateAap,
      validateDist,
      validateLab
    } = this.state

    let defaultValid = _.every(_.values(validates))
    let trainingValid = _.every(_.values(validateTraining))
    let aapValid = _.every(_.values(validateAap))
    let disValid = _.every(_.values(validateDist))
    let labValid = _.every(_.values(validateLab))
    let services = fields.services
    let servicesLength = services.length > 0
    let isTraining = _.includes(fields.services, 'CAPACITACIÓN')
    let category = fields.category

    let parentValid = (defaultValid && servicesLength && category) ? true :  false

    let appCategory = (category === AGRICOLA || category === ACUICOLA || category || PROCESADORA) && aapValid
    let distCategory = (category === DISTRIBUIDORA) && disValid
    let labCategory = (category === LABORATORIO) && labValid

    if (parentValid && (appCategory || distCategory || labCategory)) {
      if (isTraining && !trainingValid) {
        return
      }
      return true
    }
  },

  onSave () {
    let state = this.state.fields
    this.props.createContact(state)
  },

  _basicCatalogs (name, isParent = false) {
    let catalogs = this.props.catalogs
    let state = this.state[name]

    return aux.basicCatalogs(name, catalogs, state, isParent)
  },

  render () {
    let categoryFields = this._categoryFields()
    let valueLinks = this._getValueLinks()

    let categoryTypes = this._basicCatalogs('category_types')
    let countries = this._basicCatalogs('countries')
    let states = this._basicCatalogs('country', true)
    let cities = this._basicCatalogs('state', true)
    let serviceTypes = this._basicCatalogs('service_types')

    let showSubmit = this.state.showSubmit
    showSubmit = this._showSubmit()

    return (
      <div>
        <SubmenuBar {...BAR_MENU} btnSave={true}/>
        <div style={styles.FORM}>
          <Category
            categories={categoryTypes}
            onChange={this._onChange}
            values={this.state.fields}
          />
          <General
            errorText={this._errorText}
            countries={countries}
            states={states}
            cities={cities}
            values={this.state.fields}
            valueLinks={valueLinks['general']}
            onChange={this._onChange}
          />
          <Contact
            errorText={this._errorText}
            valueLinks={valueLinks['contact']}
          />
          <Service
            errorText={this._errorText}
            services={serviceTypes}
            onCheckService={this._onChange}
            values={this.state.fields}
            valueLinks={valueLinks['service']}
          />
          {categoryFields}
          <Comment valueLinks={valueLinks['comment']}/>
        </div>
        <div className='save__btn'>
          <RaisedButton
            label='Guardar'
            primary={true}
            onMouseDown={this.onSave}
            disabled={showSubmit ? false : true}
          />
        </div>
      </div>
    )
  }
})

function mapStateToProps (state, props) {
  return {
    catalogs: state.catalogsStore.all
  }
}

export default connect(
  mapStateToProps, {
    fetchCatalogs,
    createContact
  })(ContactSingle)
