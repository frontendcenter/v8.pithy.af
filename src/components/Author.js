import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Quote from './Quote'
import End from './End'
import { API } from '../utils'

const store = observable({
  featured_quotes: new Map(),
  error: false
})

export const getQuotesForAuthor = id => {
  if (!store.featured_quotes.has(id)) {
    store.featured_quotes.set(id, null)
    fetch(`${API}/authors/${id}`)
      .then(response => response.json())
      .then(quotes => {
        store.featured_quotes.set(id, quotes)
      }, () => {
        store.error = true
      })
  }
  return store.featured_quotes.get(id)
}

export const Author = observer(({ id, exclude }) => {
  const quotes = getQuotesForAuthor(id)

  return (
    <div className="Quotes">
      {exclude && <div/>}
      {
        quotes && quotes.map((quote, i) =>
          exclude === quote.id
            ? null
            : <Quote key={i} quote={quote}/>
        ).concat(
          <End key="end">
            <span>No more quotes for <em>{quotes[0].name}</em>.</span>
          </End>
        )
      }
    </div>
  )
})

export default ({ match: { params } }) => <Author id={params.id}/>
