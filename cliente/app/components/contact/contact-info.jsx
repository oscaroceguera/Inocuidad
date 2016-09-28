import React from 'react'
import moment from 'moment'
moment.locale('es')
import { connect } from 'react-redux'
import { fetchCatalogs } from '../../actions/catalogs'
import { fetchContactInfo, fetchContactAap, fetchContactLab, fetchContactDist, empty } from '../../actions/contacts'
import * as styles from '../commons/styles'
import ContactPDF from './contact-pdf.jsx'
import EmptyText from '../commons/empty-text.jsx'
import SubmenuBar from '../commons/submenu-bar.jsx'
import Avatar from '../commons/generic-avatar.jsx'
import { Styles } from 'material-ui'
import * as c from '../commons/categories'
import * as aux from '../commons/aux-functions'

const TRUE = true
const FALSE = false

const BAR_MENU = {
  title: 'Información de contacto',
  avatar: 'mdi mdi-email',
  path: '/contacts'
}

const ContactInfo = React.createClass({

  componentWillMount () {
    let categoryId = this.props.categoryID
    let contactId = this.props.contactID

    this.props.fetchContactInfo(this.props.contactID)
    this.props.fetchCatalogs()

    if (categoryId === c.AGRICOLA || categoryId === c.ACUICOLA || categoryId === c.PROCESADORA) {
      this.props.fetchContactAap(contactId)
    } else if (categoryId === c.LABORATORIO) {
      this.props.fetchContactLab(contactId)
    } else if (categoryId === c.DISTRIBUIDORA) {
      this.props.fetchContactDist(contactId)
    }
  },

  componentWillUnmount () {
    this.props.empty(c.EMPTY_CONTACT)
  },

  _textInfo (title, contact, isCatalog = FALSE, date = FALSE) {
    contact = aux.valuesForTextInfo(contact, this.props.catalogs, isCatalog, date)

    return (
      <p style={styles.MARGIN_RIGHT}>
        <label style={styles.COLOR_PINK_500}>{title} </label>
        <label style={styles.COLOR_GREY_800}>{contact}</label>
      </p>
    )
  },

  _fillCategory (categoryId, contact) {
    if (!contact) { return }

    if (categoryId === c.AGRICOLA || categoryId === c.ACUICOLA || categoryId === c.PROCESADORA) {
      return (
        <div>
          {this._textInfo('Hectáreas de producción ó estanques', contact.aapAmonunt)}
          {this._textInfo('Productos ó especies producen/frabrican', contact.aroduct)}
          {this._textInfo('¿Lleva a cabo proceso de empacado?', contact.aacked)}
          {this._textInfo('Nº albergues', contact.aapNumberShelters)}
        </div>
      )
    } else if (categoryId === c.DISTRIBUIDORA) {
      return (
        <div>
          {this._textInfo('Nº almacenes', contact.distNumberStores)}
          {this._textInfo('¿Qué productos comercializa?', contact.distProducts)}
        </div>
      )
    } else if (categoryId === c.LABORATORIO) {
      return (
        <div>
          {this._textInfo('Giro del laboratorio', contact.labCategory)}
          {this._textInfo('Normativa a acreditarse', contact.labNom)}
          {this._textInfo('Ensayos a acreditarse', contact.labTest)}
        </div>
      )
    }
  },

  _categoryInfo (categoryId) {
    let mdiIcon = ''

    // let catalogValue = _.filter(this.props.catalogs, (item) => {
    //   return item.id === categoryId
    // })

    // let category = _.map(catalogValue, (x) => x.value)
    let categoryInfoType

    if (categoryId === c.AGRICOLA) {
      mdiIcon = 'mdi mdi-leaf'
      categoryInfoType = this.props.aapData
    } else if (categoryId === c.ACUICOLA) {
      mdiIcon = 'mdi mdi-fish'
      categoryInfoType = this.props.aapData
    } else if (categoryId === c.PROCESADORA) {
      mdiIcon = 'mdi mdi-food-variant'
      categoryInfoType = this.props.aapData
    } else if (categoryId === c.LABORATORIO) {
      mdiIcon = 'mdi mdi-flask-outline'
      categoryInfoType = this.props.labData
    } else if (categoryId === c.DISTRIBUIDORA) {
      mdiIcon = 'mdi mdi-truck'
      categoryInfoType = this.props.distData
    }

    return (
      <div>
        <Avatar
          icon={mdiIcon}
          backgroundColor={Styles.Colors.green500}
          title={c.CATEGORIES[categoryId]}
        />
        <div style={styles.INFO_FLEX_CONTAINER}>
          {this._fillCategory(categoryId, categoryInfoType)}
        </div>
      </div>
    )
  },

  render () {
    let contact = this.props.contactData

    if (!contact) { return <EmptyText /> }

    return (<div>
      <SubmenuBar
        {...BAR_MENU}
        btnSave={TRUE}
      />
      <ContactPDF
        data={this.props.contactData}
        catalogs={this.props.catalogs}
        aapData={this.props.aapData}
        labData={this.props.labData}
        distData={this.props.distData}
      />
      <div style={styles.FORM} id='contactInfo'>
        <div>
          <Avatar
            icon='mdi mdi-factory'
            backgroundColor={Styles.Colors.purple500}
            title='Generales de la empresa'
          />
          <div style={styles.INFO_FLEX_CONTAINER}>
            {this._textInfo('Nombre', contact.companyName)}
            {this._textInfo('RFC', contact.rfc)}
            {this._textInfo('País', contact.country, true)}
            {this._textInfo('Estado', contact.state, true)}
            {this._textInfo('Municipio', contact.city, true)}
            {this._textInfo('Localidad', contact.locality)}
            {this._textInfo('Calle', contact.street)}
            {this._textInfo('Número', contact.number)}
            {this._textInfo('Colonia', contact.suburb)}
            {this._textInfo('C.P.', contact.zipCode)}
            {this._textInfo('Email', contact.companyEmail)}
            {this._textInfo('Teléfono', contact.companyPhone)}
            {this._textInfo('Giro', contact.category, true)}
          </div>

          <div>
            <Avatar
              icon='mdi mdi-email'
              backgroundColor={Styles.Colors.orange500}
              title='Información de contacto'
            />
            <div style={styles.INFO_FLEX_CONTAINER}>
              {this._textInfo('Nombre', contact.contactName)}
              {this._textInfo('Teléfono', contact.contactPhone)}
              {this._textInfo('Email', contact.contactEmail)}
              {this._textInfo('Puesto', contact.contactPosition)}
            </div>
          </div>

          <div>
            <Avatar
              icon='mdi mdi-barcode'
              backgroundColor={Styles.Colors.blue500}
              title='Servicio requerido'
            />
            <div style={styles.INFO_FLEX_CONTAINER}>
              {this._textInfo('Servicio', contact.services)}
              {this._textInfo('Esquema', contact.schema)}
              {this._textInfo('Certificaciones de la empresa', contact.certification)}
              {this._textInfo('Temas de capacitación', contact.trainingTopic)}
              {this._textInfo('Nº personas', contact.numberPeople)}
              {this._textInfo('Nivel jerárquico', contact.hierarchicalLevel)}
              {this._textInfo('Cita', contact.appointment, false, true)}
              {this._textInfo('Comentarios', contact.comentaries)}
            </div>
          </div>

          <div>
            {this._categoryInfo(contact.category)}
          </div>
        </div>
      </div>
    </div>)
  }
})

function mapStateToProps (state, props) {
  return {
    contactData: state.contactData.contact,
    aapData: state.contactData.aap,
    labData: state.contactData.lab,
    distData: state.contactData.dist,
    contactID: props.params.contactId,
    categoryID: props.params.categoryId,
    catalogs: state.catalogsStore.all
  }
}

export default connect(mapStateToProps, {
  fetchContactAap,
  fetchContactInfo,
  fetchContactLab,
  fetchContactDist,
  fetchCatalogs,
  empty
})(ContactInfo)
