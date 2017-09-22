import React from 'react'
import Quote from './Quote'
import End from './End'
import { observer } from 'mobx-react'
import { API } from '../utils'
import { observable } from 'mobx'

const store = observable({
  featured_quotes: null,
  error: false
})

let loading = false
export const getFeaturedQuotes = () => {
  if (!loading) {
    loading = true
    fetch(`${API}/quotes/featured`)
      .then(response => response.json())
      .then(quotes => {
        store.featured_quotes = quotes
      }, () => {
        store.error = true
      })
  }
  return store.featured_quotes
}

const Home = () => {
  const quotes = getFeaturedQuotes()
  return (
    <div className="Quotes">
      {
        quotes && quotes
          .map((quote, i) => <Quote key={i} quote={quote}/>)
          .concat(
            <End key="end">
              <span>That's all the quotes we have.</span>
            </End>
          )
      }
    </div>
  )
}

export default observer(Home)
