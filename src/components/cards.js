// props.property = one property from the JSON
// props.openform = function that opens the popup
function Cards(props) {
  const property = props.property;

  return (
    <div className="property-card">
      <img
        src={property.property_image}
        alt={property.title}
        className="property-img"
      />
      <h5 className="property-title">{property.title}</h5>
      <p className="property-developer">By {property.developer}</p>
      <p className="property-area">📍 {property.area}</p>
      <p className="property-price">
        {property.currency} {property.property_price.toLocaleString("en-US")}
      </p>
      <button className="card-btn" onClick={props.openform}>
        Contact
      </button>
    </div>
  );
}

export default Cards;