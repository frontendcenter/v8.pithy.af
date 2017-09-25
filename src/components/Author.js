import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Quote from './Quote'
import End from './End'
import { API } from '../utils'

const store = observable({
  quotes_by_author: new Map(),
  error: false
})

export const getQuotesForAuthor = id => {
  if (!store.quotes_by_author.has(id)) {
    store.quotes_by_author.set(id, null)
    fetch(`${API}/authors/${id}`)
      .then(response => response.json())
      .then(quotes => {
        store.quotes_by_author.set(id, quotes)
      }, () => {
        store.error = true
      })
  }
  return store.quotes_by_author.get(id)
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
