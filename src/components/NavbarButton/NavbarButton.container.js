import { connect } from 'react-redux'
import { push } from 'connected-react-router'

import { getLocation } from '../../redux/selectors/router'

import NavbarButton from './NavbarButton'

const mapStateToProps = (state = {}) => ({
  currentRoute: getLocation(state),
})

const mapDispatchToProps = dispatch => ({
  navigate: (route) => {
    dispatch(push(route))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(NavbarButton)
