import { extendObservable } from 'mobx'

import { API } from '../utils'
import store from '../store'

export default class Quote {
  constructor(json) {
    extendObservable(this, json)
  }

  upvote(id) {
    fetch(`${API}/quotes/${id}/upvote`, { method: 'POST' })
    this.score++
  }

  static create(json) {
    if (!store.quotes.has(json.id))
      store.quotes.set(json.id, new Quote(json))
    return store.quotes.get(json.id)
  }
}
