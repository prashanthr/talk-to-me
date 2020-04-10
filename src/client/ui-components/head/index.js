import React from 'react'
import Helmet from 'react-helmet'
import { SITE_NAME, TITLE, META } from '../meta.js'

const Head = ({ title, meta, favIcon, appendSiteNamePrefix }) => (
  <Helmet
    title={appendSiteNamePrefix ? `${SITE_NAME} - ${title}` : title}
    meta={meta}
    link={[
      favIcon ? { rel: 'icon', href: favIcon } : {}
    ]}
  />
)

Head.defaultProps = {
  appendSiteNamePrefix: true,
  title: TITLE,
  meta: META
}

export default Head
