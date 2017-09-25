import React from 'react'
import { observable } from 'mobx'
import { observer } from 'mobx-react'

import Quote from './Quote'
import { API, simplify } from '../utils'
import End from './End'
import Link from './Link'

const store = observable({
  quotes_by_work: new Map(),
  error: false
})

export const getQuotesForWork = id => {
  if (!store.quotes_by_work.has(id)) {
    store.quotes_by_work.set(id, null)
    fetch(`${API}/works/${id}`)
      .then(response => response.json())
      .then(quotes => {
        store.quotes_by_work.set(id, quotes)
      }, () => {
        store.error = true
      })
  }
  return store.quotes_by_work.get(id)
}

export const Work = observer(({ id }) => {
  const quotes = getQuotesForWork(id)

  return (
    <div className="Quotes">
      {
        quotes && quotes.map(
          (quote, i) => <Quote key={i} quote={quote}/>
        ).concat(
          <End key="end">
            <span><em>{quotes[0].title}</em> has no further quotes.</span>
            <Link to={`/authors/${simplify(quotes[0].name)}-${quotes[0].author_id}`} obvious>
              See more by {quotes[0].name}
            </Link>
            or
          </End>
        )
      }
    </div>
  )
})

export default ({ match: { params } }) => <Work id={params.id}/>
