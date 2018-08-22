import React from 'react'
import { connect } from 'react-redux'
import { MenuItemLink, getResources } from 'admin-on-rest'
import DashboardIcon from 'material-ui/svg-icons/action/dashboard'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const DashboardMenuItem = ({ onClick, translate }) => (
  <MenuItem
    containerElement={<Link to='/' />}
    primaryText={'Home'}
    leftIcon={<DashboardIcon />}
    onClick={onClick}
  />
)

DashboardMenuItem.propTypes = {
  onClick: PropTypes.func
}

const Menu = ({ resources, onMenuTap, logout }) => (
  <div>
    {<DashboardMenuItem onClick={onMenuTap} />}
    {resources
      .filter(r => r.list)
      .map(resource => (
        <MenuItemLink
          key={resource.name}
          to={`/${resource.name}`}
          primaryText={resource.options.label}
          leftIcon={<resource.icon />}
          onClick={onMenuTap}
        />
      ))}
    {logout}
  </div>
)

const mapStateToProps = state => ({
  resources: getResources(state)
})
export default connect(mapStateToProps)(Menu)
