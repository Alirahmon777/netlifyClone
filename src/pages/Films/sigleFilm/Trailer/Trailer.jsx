import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_KEY, api } from "../../../../utils/api";

const Trailer = () => {
  const [trailer, setTrailer] = useState([]);
  const { id } = useParams("id");

  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  let trailerArray = [];

  trailer.map((trail) => trailerArray.push(trail));
  const [trailerType] = trailerArray.filter((trail) =>
    trail.type.toLowerCase().includes("trailer") ? trail.key : ""
  );
  useEffect(() => {
    api()
      .get(`movie/${id}/videos?api_key=${API_KEY}`)
      .then(({ data: { results } }) => setTrailer(results));
  }, [id]);
  return (
    <>
      <div className="container">
        <button
          onClick={goBack}
          className="px-5 mt-10 inline cursor-pointer py-3 text-sm font-medium leading-5 shadow-2xl text-white transition-all duration-400 border border-transparent rounded-lg focus:outline-none bg-red-600 active:bg-orange-400 hover:bg-orange-500"
        >
          Go Back
        </button>

        <h2 className="text-white text-center my-4 text-4xl">
          {trailerType?.name}
        </h2>

        <iframe
          src={`https://www.youtube.com/embed/${trailerType?.key}?autoplay=1`}
          className="w-[70%] h-[700px] shadow mx-auto"
          display="block"
          position="relative"
          allow="clipboard-write; accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share;"
          allowFullScreen
        />
      </div>
    </>
  );
};

export default Trailer;
