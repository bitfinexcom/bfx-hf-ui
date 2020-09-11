import React from 'react'
import i18n from './i18n.json'

const dictionary = i18n['ru-RU']
export default class AuthenticationInit extends React.Component {
  render() {
    return (
      <div className='hfui-authenticationpage__content'>
        <h2>Honey Framework UI</h2>
        <p>{dictionary.start}</p>

        <form className='hfui-authenticationpage__inner-form' />
      </div>
    )
  }
}
