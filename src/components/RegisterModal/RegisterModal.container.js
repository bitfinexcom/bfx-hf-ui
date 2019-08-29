import { connect } from 'react-redux'
import sha from 'sha.js'

import WSDTCActions from '../../redux/actions/ws_dtc_server'

import RegisterModal from './RegisterModal'

const mapStateToProps = (state = {}, ownProps = {}) => ({}) // eslint-disable-line

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ username, password, email }) => {
    const hashedPassword = sha('sha256').update(password).digest('hex')
    dispatch(WSDTCActions.send(['register', username, hashedPassword, email]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)
