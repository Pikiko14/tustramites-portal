import React from 'react'
import { Viewer } from '@react-pdf-viewer/core'
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout'
import '@react-pdf-viewer/core/lib/styles/index.css'
import '@react-pdf-viewer/default-layout/lib/styles/index.css'
import { Worker } from '@react-pdf-viewer/core'

const DocumentViewer = ({ url }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin()

  const characterMap = {
    isCompressed: true,
    url: 'https://unpkg.com/pdfjs-dist@2.1.266/cmaps/'
  }

  return (
    <Worker workerUrl='https://unpkg.com/pdfjs-dist@2.1.266/build/pdf.worker.min.js'>
      <Viewer
        characterMap={characterMap}
        fileUrl={url||'/document.pdf'}
        plugins={[
          defaultLayoutPluginInstance
        ]}
      />
    </Worker>
  )
}

export default DocumentViewer
