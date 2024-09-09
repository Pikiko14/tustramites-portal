import React, { useEffect, useState } from 'react'
import HttpClient from '../../helpers/network/HttpClient'


const Policies = () => {

  const [page, setPage] = useState()

  const loadPages = async () => {
    const response = await HttpClient.get('/api/page')
    if (response.status === 200) {
      setPage(response.data.find((x) => x.url === 'politica-privacidad'))
    }
  }
  useEffect(() => {
    loadPages()
  }, [])

  return (
    <div style={{ margin: '70px', overflow: 'auto', height: 'auto' }}
      dangerouslySetInnerHTML={{
        __html:
          page &&
          page.content
            .replace('oembed', 'embed')
            .replace('url', 'src')
            .replace('</oembed>', '</embed>')
            .replace('watch?v=', 'embed/')
      }}
    />
  )
}

export default Policies
