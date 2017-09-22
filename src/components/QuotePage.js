import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Quote from './Quote'
import { Author } from './Author'
import { API } from '../utils'

const store = observable({
  quotes_by_id: new Map(),
  error: false
})

export const getQuoteById = id => {
  if (!store.quotes_by_id.has(id)) {
    store.quotes_by_id.set(id, null)
    fetch(`${API}/quotes/${id}`)
      .then(response => response.json())
      .then(quote => {
        store.quotes_by_id.set(id, quote)
      }, () => {
        store.error = true
      })
  }
  return store.quotes_by_id.get(id)
}

const QuotePage = observer(({ id }) => {
  const quote = getQuoteById(id)

  return quote ? (
    <div>
      <div className="Quotes">
        <Quote quote={quote}/>
      </div>
      <div className="SectionDivider">Also by {quote.name}:</div>
      <Author id={quote.author_id} exclude={quote.id}/>
    </div>
  ) : (
    <div className="Quotes"/>
  )
})

export default ({ match: { params } }) => <QuotePage key={params.id} id={params.id}/>
