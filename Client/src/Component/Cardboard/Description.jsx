const Description = ({heading,description, src}) => {
  return (
    <>
      <div className="col-lg-6">
        <div className="info-area">
          <h1>{heading}</h1>
          <p>
            {description}
          </p>
          <img className="img-fluid" src={src}/>
        </div>
      </div>
    </>
  );
};
export default Description;
