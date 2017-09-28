import React from 'react'
import { observer } from 'mobx-react'

import Quote from './Quote'
import End from './End'
import { getQuotesForEndpoint } from '../store'

export const Author = observer(({ id, exclude }) => {
  const quotes = getQuotesForEndpoint(`authors/${id}`)

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
