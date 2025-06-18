import useAxios from '../../hooks/useAxios';
import "./featuredProperties.css";

const FeaturedProperties = () => {
  const url = "https://hotel-tonight.onrender.com/hotels/getfeatured";
  const { data, loading, error } = useAxios(url);
  
  console.log(data)
  return (
    <div className="fp">
      {
         loading ? "loading" : (
          <>
            {data.map((item) => {
              return (
              <div className="fpItem">
              <img
                src={item.photos[0]}
                alt="logo"
                className="fpImg"
              />
                  <span className="fpName">{item.name}</span>
                  <span className="fpCity">{item.city}</span>
              <div className="fpRating">                
                <span>{item.description}</span>
              </div>
            </div>)
            })}
          </>
        ) 
      }
    </div>
  );
};

export default FeaturedProperties;
