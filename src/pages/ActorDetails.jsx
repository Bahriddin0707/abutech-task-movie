import { useEffect, useState } from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { useParams } from "react-router-dom";

// Components
import Loader from "../components/Loader";
import Message from "../components/Message";

// Images
const nullw185 = require("../images/nullw185.png");
const nullw500 = require("../images/nullw500.png");

function ActorDetails() {
  const [actor, setActor] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { id: actorId } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `https://api.themoviedb.org/3/person/${actorId}?api_key=0e41e7f498173fb2dfd1d5f4018a25f9&language=en-US`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const data = await response.json();
        setIsLoading(false);
        setActor(data);
      } catch (error) {
        setIsLoading(false);
        setError(error || error.message);
        console.error("Error fetching movie:", error.message);
      }
    };
    fetchMovies();
  }, [actorId]);

  return (
    <div className="actor-details pt-5">
      <Container>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <>
            <Row>
              <Col md={4}>
                <Image
                  src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                  alt={actor.title}
                  fluid
                />
              </Col>
              <Col md={8}>
                <h1 className="mt-4">{actor.name}</h1>
                <div className="mt-3 actor-bio">{actor.biography}</div>
              </Col>
            </Row>

            <div className="details-grid mt-5">
              <h2>Personal Info</h2>
              <div>
                <div className="details-title">Name</div>
                <div className="details-value">{actor.name}</div>
              </div>
              <div>
                <div className="details-title">Birthday</div>
                <div className="details-value">{actor.birthday}</div>
              </div>
              <div>
                <div className="details-title">Known For</div>
                <div className="details-value">
                  {actor.known_for_department}
                </div>
              </div>
              <div>
                <div className="details-title">Gender</div>
                <div className="details-value">
                  {actor.gender === 1 ? "Female" : "Male"}
                </div>
              </div>
              <div>
                <div className="details-title">Place Of Birth</div>
                <div className="details-value">{actor.place_of_birth}</div>
              </div>

              <div>
                <div className="details-title">Website</div>
                <div className="details-value">
                  {actor.homepage ? actor.homepage : "-"}
                </div>
              </div>

              <div>
                <div className="details-title">Also Known as</div>
                <div className="details-value">
                  {actor.also_known_as
                    ? actor.also_known_as.map((i) => (
                        <span key={i}>
                          {i}
                          <br />
                        </span>
                      ))
                    : "-"}
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  );
}

export default ActorDetails;
