import type { NextPage } from 'next'
import PdfViewer from '../components/PdfViewer'
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="container">
      <Head>
        <title>PDF Viewer</title>
        <meta name="description" content="View PDF files page by page" />
      </Head>

      <main>
        <h1>PDF Viewer</h1>
        <PdfViewer file="/sample.pdf" />
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        main {
          flex: 1;
          width: 100%;
          max-width: 800px;
        }
      `}</style>
    </div>
  )
}

export default Home
