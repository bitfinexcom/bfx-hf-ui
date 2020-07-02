import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { Remarkable } from 'remarkable'
import { linkify } from 'remarkable/linkify'
import hljs from 'highlight.js'
import sanitizeHtml from 'sanitize-html'

import { propTypes, defaultProps } from './Markdown.props'
import './style.css'

const md = new Remarkable({
  typographer: true,
  xhtmlOut: true,
  linkify: true,
  breaks: true,
  quotes: '“”‘’',
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return hljs.highlight(lang, str).value
      } catch (err) {
        return ''
      }
    }
    try {
      return hljs.highlightAuto(str).value
    } catch (err) {
      return ''
    }
  },
}).use(linkify)

export default class Panel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  render() {
    const { text } = this.props
    return (
      <Scrollbars
        renderTrackVertical={props => (
          <div {...props} className='hfui-scrollbars-track-vertical' />
        )}
        renderThumbVertical={props => (
          <div {...props} className='hfui-scrollbars-thumb-vertical' />
        )}
      >
        <div
          className='hfui-markdown__wrapper'
          dangerouslySetInnerHTML={{/* eslint-disable-line */
            __html: md.render(sanitizeHtml(text)),
          }}
        />
      </Scrollbars>
    )
  }
}
