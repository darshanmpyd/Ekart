import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const ShowRatingsInStars = ({ rating }: { rating: number }) => {
  const fullstars = Math.floor(rating);
  const halfstar = rating % 1 >= 0.5;
  const emptystars = 5 - fullstars - Number(halfstar);

  return (
    <div className="flex py-1">
      {/* 
        converting a number into a array of length number with values undefined
        -,i =>to get an integer value to pass for key
        because each map item should contain a unique key
    */}
      {[...Array(fullstars)].map((_, i) => (
        <FaStar key={i} />
      ))}
      {halfstar && <FaStarHalfAlt />}

      {[...Array(emptystars)].map((_, i) => (
        <FaRegStar key={i} />
      ))}
    </div>
  );
};

export default ShowRatingsInStars;
