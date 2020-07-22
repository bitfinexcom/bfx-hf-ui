import React from 'react'
import Scrollbars from 'react-custom-scrollbars'
import { Remarkable } from 'remarkable'
import { linkify } from 'remarkable/linkify'
import hljs from 'highlight.js'
import sanitizeHtml from 'sanitize-html'

import { propTypes, defaultProps } from './Markdown.props'
import './style.css'

const md = new Remarkable({
  html: true, // Enable HTML tags in source
  xhtmlOut: true, // Use '/' to close single tags (<br />)
  breaks: true, // Convert '\n' in paragraphs into <br>
  linkify: true, // autoconvert URL-like texts to links
  typographer: true, // Enable some language-neutral replacements + quotes beautification
  // Double + single quotes replacement pairs, when typographer enabled,
  // and smartquotes on. Set doubles to '«»' for Russian, '„“' for German.
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
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: md.render(sanitizeHtml(text)) }}
        />
      </Scrollbars>
    )
  }
}
