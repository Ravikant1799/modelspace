const Loader = ({ imgSrc }) => {
  return (
    <div className="loader">
      {imgSrc ? (
        <img width={1020} src={imgSrc} alt="Loading ... " />
      ) : (
        <span>Loading ...</span>
      )}
    </div>
  );
};

export default Loader;
