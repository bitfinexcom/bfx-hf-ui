import { connect } from 'react-redux'
import sha from 'sha.js'

import WSDTCActions from '../../redux/actions/ws_dtc_server'

import LoginModal from './LoginModal'

const mapStateToProps = (state = {}, ownProps = {}) => ({}) // eslint-disable-line

const mapDispatchToProps = dispatch => ({
  onSubmit: ({ username, password, remember }) => {
    const hashedPassword = sha('sha256').update(password).digest('hex')
    dispatch(WSDTCActions.send(['auth', username, hashedPassword, remember]))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal)
