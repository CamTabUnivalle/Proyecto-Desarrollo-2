// Banner.jsx
import React from "react";
import "./Banner.css";

const Banner = () => {
  return (
    <section className="featured-section">
      <div className="container featured-content">

        {/* Columna de imágenes */}
        <div className="images-column">
          <div className="small-images">
            <div className="img-wrapper img-small">
              <img src="/path/to/planta1.jpg" alt="Planta 1" />
            </div>
            <div className="img-wrapper img-small">
              <img src="/path/to/cactus.jpg" alt="Cactus" />
            </div>
          </div>
          <div className="img-wrapper img-large">
            <img src="/path/to/tulipanes.jpg" alt="Anthurium Flower" />
            <div className="overlay">
              <h3 className="overlay-title">Anthurium Flower</h3>
              <p className="overlay-text">
                The flower of human being. It has meaningful fact that the plant always grow whatever season and weather…
              </p>
              <a href="#" className="btn overlay-btn">
                Read More
              </a>
            </div>
          </div>
        </div>

        {/* Columna de texto */}
        <div className="text-column">
          <h2 className="headline">Lorem ipsum dolor sit amet.</h2>
          <p className="subtext">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse aliquam nisi a odio commodo.
          </p>
          <a href="#" className="btn primary-btn">
            Ver Más Productos
          </a>
        </div>

      </div>
    </section>
  );
};

export default Banner;
