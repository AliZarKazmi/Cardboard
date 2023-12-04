function ImgGrid({ images, start }) {
  return (
    <>
      <div className="inner-grid" key={start}>
        {images.map((image, index) => {
          return (
            <>
              <div
                key={`img-${index + start}`}
                className={`img-${index + start}`}
              >
                {index == 2 ? (
                  <>
                    <div className="img-wraper lg-img">
                      <img className="img-fluid w-100 " src={image.src} />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="img-wraper sm-img">
                      <img className="img-fluid w-100 " src={image.src} />
                    </div>
                  </>
                )}
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}
export default ImgGrid;
