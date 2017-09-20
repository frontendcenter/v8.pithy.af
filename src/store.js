import { API } from './utils'
import { observable } from 'mobx'

const store = observable({
  quotes_by_id: new Map(),
  quote_lists: new Map(),
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

export const getFeaturedQuotes = () => {
  if (!store.quote_lists.has('featured')) {
    store.quote_lists.set('featured', null)
    fetch(`${API}/quotes/featured`)
      .then(response => response.json())
      .then(quotes => {
        const observable_quotes = quotes.map(quote => observable(quote))
        observable_quotes.forEach(quote => store.quotes_by_id.set(quote.id, quote))
        store.quote_lists.set('featured', observable_quotes)
      }, () => {
        store.error = true
      })
  }
  return store.quote_lists.get('featured')
}
