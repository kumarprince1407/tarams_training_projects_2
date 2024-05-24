import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useSelector, useDispatch } from "react-redux"; //change
import { fetchPhotos } from "../redux";

// function PhotoContainer({ fetchPhotos }) {
function PhotoContainer() {
  const dispatch = useDispatch();

  const photoData = useSelector((state) => state);

  useEffect(() => {
    dispatch(fetchPhotos());
  }, [dispatch]); //works without 'dispatch' as well

  return (
    <div>
      <p>Photos from JSON placeholder</p>
      {photoData.loading ? (
        <h2>Loading</h2>
      ) : photoData.error ? (
        <h2>photoData.error</h2>
      ) : (
        <div>
          <h2>Photo List:</h2>
          <div>
            {photoData &&
              photoData.photos &&
              photoData.photos.slice(0, 9).map((photo) => (
                <div key={photo.id}>
                  <img
                    src={photo.url}
                    alt={photo.title}
                    width="500"
                    height="500"
                  ></img>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     photoData: state,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     fetchPhotos: () => dispatch(fetchPhotos()),
//   };
// };

//export default connect(mapStateToProps, mapDispatchToProps)(PhotoContainer);
export default PhotoContainer;
