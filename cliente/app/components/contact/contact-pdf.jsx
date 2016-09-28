import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import * as styles from '../commons/styles'
import * as aux from '../commons/aux-functions'
import src from '../../images/logo-landscape.png'

function showLaboratory (data) {
  if (!data) { return '' }

  return [
    { text: 'LABORATORIO', style: 'header' },
    { text: [
      { text: 'Giro del laboratorio: ', style: 'title' },
      { text: `${data.labCategory}`, style: 'label' },
      '\n'
    ]},
    { text: [
      { text: 'Normatividad en la que requiere acreditarse: ', style: 'title' },
      { text: `${data.labNom}`, style: 'label' },
      '\n'
    ]},
    { text: [
      { text: '¿Qué ensayos requiere acreditar? ', style: 'title' },
      { text: `${data.labTest}`, style: 'label' },
      '\n'
    ]}
  ]
}

function showStorage (data) {
  if (!data) { return '' }

  return [
    { text: 'DISTRIBUIDORA', style: 'header' },
    { text: [
      { text: '¿Cuántos almacenes tiene? ', style: 'title' },
      { text: `${data.distNumberStores}`, style: 'label' },
      '\n'
    ]},
    { text: [
      { text: '¿Qué productos comercializa? ', style: 'title' },
      { text: `${data.distProducts}`, style: 'label' },
      '\n'
    ]}
  ]
}

function showAPP (data) {
  if (!data) { return '' }

  return [
    { text: 'AGRÍCOLA/ACUÍCOLA/PROCESADORA', style: 'header' },
    { text: [
      { text: '¿Cuantas hectáreas de producción o estanques tiene la empresa? ', style: 'title' },
      { text: `${data.aapAmonunt}`, style: 'label' },
      '\n'
    ]},
    { text: [
      { text: '¿Qué productos o especies producen/fabrican? ', style: 'title' },
      { text: `${data.aapProduct}`, style: 'label' },
      '\n'
    ]},
    { text: [
      { text: '¿Llevan a cabo proceso de empacado? ', style: 'title' },
      { text: `${data.aapPacked}`, style: 'label' },
      '\n'
    ]},
    { text: [
      { text: '¿Cuántos albergues tiene la empresa? ', style: 'title' },
      { text: `${data.aapNumberShelters}`, style: 'label' },
      '\n'
    ]}
  ]
}

const ContactPDF = React.createClass({
  _onClick () {
    let contact = this.props.data
    let aap = this.props.aapData
    let labData = this.props.labData
    let distData = this.props.distData
    let catalogs = this.props.catalogs

    let docDefinition = {
      footer: function (currentPage, pageCount) {
        return {
          text: `Página ${currentPage.toString()} de ${pageCount}`,
          style: 'footer'
        }
      },
      pageMargins: [ 40, 110, 40, 40 ],
      header: {
        margin: [30, 30, 0, 0],
        table: {
          widths: [ 200, 100, 100, 100 ],
          body: [
            [
              {image: src, alignment: 'center', rowSpan: 2, fit: [180, 180]},
              {text: 'INFORMACIÓN DE CONTACTO', style: 'thTable', colSpan: 3},
              {},
              {}
            ],
            [
              {},
              {text: 'Código: T RE-AD- 03', style: 'tdHeader'},
              {text: 'Versión: 00', style: 'tdHeader'},
              {text: 'Elaboración:17/06/2018', style: 'tdHeader'}
            ]
          ]
        },
        layout: 'noBorders'
      },
      content: [
        { text: 'DATOS GENERALES DE LA EMPRESA', style: 'header' },
        { text: [
          { text: 'Nombre de la empresa: ', style: 'title' },
          { text: `${contact.companyName}`, style: 'label' }
        ]},
        { text: [
          { text: 'RFC de la empresa: ', style: 'title' },
          { text: `${contact.rfc}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Giro de la empresa: ', style: 'title' },
          { text: `${aux.valuesForTextInfo(contact.category, catalogs, true)}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'País: ', style: 'title' },
          { text: `${aux.valuesForTextInfo(contact.country, catalogs, true)}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Estado: ', style: 'title' },
          { text: `${aux.valuesForTextInfo(contact.state, catalogs, true)}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Ciudad/Municipio: ', style: 'title' },
          { text: `${aux.valuesForTextInfo(contact.city, catalogs, true)}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Localidad: ', style: 'title' },
          { text: `${contact.locality}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Calle: ', style: 'title' },
          { text: `${contact.street}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Número: ', style: 'title' },
          { text: `${contact.number}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Colonia: ', style: 'title' },
          { text: `${contact.suburb}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'C.P.: ', style: 'title' },
          { text: `${contact.zipCode}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Email: ', style: 'title' },
          { text: `${contact.companyEmail}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Teléfono: ', style: 'title' },
          { text: `${contact.companyPhone}`, style: 'label' },
          '\n'
        ]},
        { text: 'INFORMACIÓN DE CONTACTO', style: 'header' },
        { text: [
          { text: 'Nombre: ', style: 'title' },
          { text: `${contact.contactName}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Puesto: ', style: 'title' },
          { text: `${contact.contactPosition}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Email: ', style: 'title' },
          { text: `${contact.contactPhone}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Teléfono: ', style: 'title' },
          { text: `${contact.contactEmail}`, style: 'label' },
          '\n'
        ]},
        { text: 'INFORMACIÓN COMPLEMENTARIA', style: 'header' },
        { text: [
          { text: 'Servico requerido: ', style: 'title' },
          { text: `${contact.services}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Esquema requerido: ', style: 'title' },
          { text: `${contact.schema}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: '¿Tiene certificaciones en inocuidad? ', style: 'title' },
          { text: `${contact.certification}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Temas de capacitación: ', style: 'title' },
          { text: `${contact.trainingTopic}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Nº personas a capacitarse: ', style: 'title' },
          { text: `${contact.numberPeople}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Nivel de capacitación: ', style: 'title' },
          { text: `${contact.hierarchicalLevel}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Fecha de visita: ', style: 'title' },
          { text: `${aux.valuesForTextInfo(contact.appointment, catalogs, false, true)}`, style: 'label' },
          '\n'
        ]},
        { text: [
          { text: 'Comentarios: ', style: 'title' },
          { text: `${contact.comentaries}`, style: 'label' },
          '\n'
        ]},
        showAPP(aap),
        showStorage(distData),
        showLaboratory(labData)
      ],

      // margin: [left, top, right, bottom]
      styles: {
        header: {
          fontSize: 10,
          bold: true,
          margin: [0, 10, 0, 10]
        },
        title: {
          fontSize: 10,
          bold: true,
          color: '#263238'
        },
        label: {
          fontSize: 9,
          color: '#212121'
        },
        thTable: {
          alignment: 'center',
          colSpan: 3,
          color: '#263238',
          margin: [0, 10, 0, 10]
        },
        tdHeader: {
          margin: [5, 5, 5, 0],
          alignment: 'center',
          fontSize: 8
        },
        footer: {
          alignment: 'right',
          margin: [40, 0],
          fontSize: 8
        }
      }
    }

    pdfMake
      .createPdf(docDefinition)
      //.open()
      .download(`${_.startCase(contact.companyName)}`)
  },

  render () {
    return (
      <div style={styles.CONTAINER_BTN_PDF}>
        <IconButton
          iconClassName='mdi mdi-file-pdf-box'
          iconStyle={styles.BTN_PDF}
          onClick={this._onClick}
        />
      </div>
    )
  }
})

export default ContactPDF
