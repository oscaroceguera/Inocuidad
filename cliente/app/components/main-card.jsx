import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import _ from 'lodash'

import Avatar from 'material-ui/lib/avatar'
import Card from 'material-ui/lib/card/card'
import FlatButton from 'material-ui/lib/flat-button'
import CardHeader from 'material-ui/lib/card/card-header'
import CardMedia from 'material-ui/lib/card/card-media'
import CardText from 'material-ui/lib/card/card-text'
import { Styles } from 'material-ui'

const styles = {
  CARD: {
    marginBottom: '1em',
    width: '21em'
  },
  ITEMS: {
    listStyle: 'none',
    margin: 0,
    padding: 0
  },
  ITEM: {
    borderBottom: `1px solid ${Styles.Colors.grey300}`,
    color: Styles.Colors.pink500,
    padding: '.5em'
  },
  CARD_ACTION: {
    padding: '.5em .5em 1em .5em'
  },
  BG_AVATAR: {
    backgroundColor: Styles.Colors.purple500
  }
}

class MainCard extends Component {
  render () {
    let { title, subtitle, avatar, image, items, path } = this.props
    items = _.split(items, ',')

    return (
      <Card style={styles.CARD} initiallyExpanded={false}>
        <CardHeader
          showExpandableButton={true}
          title={title}
          subtitle={subtitle}
          avatar={<Avatar className={avatar} style={styles.BG_AVATAR}/>}
        />
        <CardMedia>
          <img className={image} />
        </CardMedia>
        <CardText expandable={true}>
          <ul style={styles.ITEMS}>
          {
            items.map((item) => {
              return <li style={styles.ITEM} key={item}>{item}</li>
            })
          }
          </ul>
        </CardText>
        <div style={styles.CARD_ACTION}>
          <Link to={path}>
            <FlatButton secondary={true} label='Explorar'/>
          </Link>
        </div>
      </Card>
    )
  }
}

MainCard.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  items: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired
}

export default MainCard
