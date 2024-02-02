function Empty({ image, message, width, height }) {
  return (
    <div
      style={{
        textAlign: 'center',
        fontFamily: 'Montserrat',
        fontSize: 27,
        marginTop: 45,
      }}
    >
      <img src={image} width={width} height={height} />
      <p style={{ color: '#98cfff', marginTop: 10 }}>{message}</p>
    </div>
  );
}
export default Empty;
