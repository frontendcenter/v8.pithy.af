import React from 'react'
import Quote from './Quote'
import { observer } from 'mobx-react'

import { Author } from './Author'
import { getQuoteById } from '../store'

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
