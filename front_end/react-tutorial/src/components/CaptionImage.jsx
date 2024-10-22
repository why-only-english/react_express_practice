function CaptionImage(props) {
  return (
    <div style={{ textAlign: 'center' }}>
      <img src={props.imgUrl} alt={props.caption} style={{ maxWidth: '100%', height: 'auto' }} />
      <p>{props.caption}</p>
    </div>
  );
}

export default CaptionImage;
