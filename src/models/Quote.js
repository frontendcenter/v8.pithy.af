import { extendObservable } from 'mobx'

import { API } from '../utils'
import store from '../store'

export default class Quote {
  constructor(json) {
    extendObservable(this, json)
  }

  upvote() {
    fetch(`${API}/quotes/${this.id}/upvote`, { method: 'POST' })
    this.score++
  }

  static createOrUpdate(json) {
    if (!store.quotes.has(json.id)) {
      const created = new Quote(json)
      store.quotes.set(json.id, created)
      return created
    } else {
      const existing = store.quotes.get(json.id)
      Object.assign(existing, json)
      return existing
    }
  }
}
