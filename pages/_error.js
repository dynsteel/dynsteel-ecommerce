function Error({ statusCode }) {
  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>
        {statusCode
          ? `Sunucu tarafında ${statusCode} hatası oluştu`
          : 'İstemci tarafında bir hata oluştu'}
      </h1>
    </div>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error

