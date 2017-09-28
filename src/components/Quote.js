import React from 'react'
import Link from './Link'
import LinkSVG from './LinkSVG'
import { simplify } from '../utils'
import ButtonLink from './ButtonLink'
import { observer } from 'mobx-react'

const SIZES = ['s', 's', 'm', 'l', 'l']

const Quote = observer(({ quote }) => {
  const {
    id, short, em_index, year, name,
    title, author_id, work_id, score,
  } = quote
  const size = SIZES[Math.floor(short.length / 100)] || 'xl'
  let em = short.substr(0, em_index)
  return (
    <div className="Quote -main">
      <div className="Quote_Inner">
        <div className="Quote_Short" data-size={size}>
          <em>{em}</em>
          {short.substr(em_index)}
        </div>
        {name &&
        <Link to={`/authors/${simplify(name)}-${author_id}`}
              block
              className="Quote_Attribution">{name}</Link>
        }
        <div className="Quote_Work">
          {title &&
          <Link to={`/works/${simplify(title)}-${work_id}`}>
            {title}
            {year && ` (${year})`}
          </Link>
          }
          <Link to={`/quote/${simplify(em)}-${id}`}>
            <LinkSVG/>
          </Link>
          <ButtonLink onClick={() => quote.upvote()}>
            <span role="img" aria-label="Add applause">👏</span>
          </ButtonLink>
          <span className="Quote_Score">({score || 0})</span>
        </div>
      </div>
    </div>
  );
})

export default Quote
