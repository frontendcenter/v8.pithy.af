import { observable } from 'mobx'
import { API } from './utils'
import Quote from './models/Quote'

const store = observable({
  quotes: new Map(),
  quotes_by_endpoint: new Map(),
  error: false
})
export default store

export const getQuotesForEndpoint = endpoint => {
  if (!store.quotes_by_endpoint.has(endpoint)) {
    store.quotes_by_endpoint.set(endpoint, null)
    fetch(`${API}/${endpoint}`)
      .then(response => response.json())
      .then(json => {
        store.quotes_by_endpoint.set(endpoint, json.map(Quote.create))
      }, () => {
        store.error = true
      })
  }
  return store.quotes_by_endpoint.get(endpoint)
}

export const getQuoteById = id => {
  if (!store.quotes.has(id)) {
    store.quotes.set(id, null)
    fetch(`${API}/quotes/${id}`)
      .then(response => response.json())
      .then(Quote.create, () => {
        store.error = true
      })
  }
  return store.quotes.get(id)
}
