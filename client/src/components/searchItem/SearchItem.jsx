import "./searchItem.css";

const SearchItem = ({ hotel }) => {
  return (
    <div>
      <div className="searchItem">
        <img
          src={hotel.photos[0]}
          alt="logo"
          className="siImg"
        />
        <div className="siDesc">
          <h1 className="siTitle">{hotel.name}</h1>
          <span className="siDistance">500m from center</span>
          <span className="siFeatures">
            {hotel.description}
          </span>
          <span className="siCancelOp">Free cancellation </span>
          <span className="siCancelOpSubtitle">
            You can cancel later, so lock in this great price today!
          </span>
        </div>
        <div className="siDetails">
          <div className="siRating">
            <span>{hotel.rating > 7.5 ? "Excellent" : "Average"}</span>
            <button>{hotel.rating}</button>
          </div>
          <div className="siDetailTexts">
            <span className="siPrice">${hotel.price}</span>
            <span className="siTaxOp">Includes taxes and fees</span>
            <button className="siCheckButton" onClick={() => {

            }}>See availability</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
