import { useState, useEffect } from "react";
import useAuthStore from "../../../stores/use-auth-store";
import useFavStore from "../../../stores/use-fav-store";
import "./Products.css";

const productos = [
  { name: "Taladro", img: "/image/taladro1.png", price: 135 },
  { name: "Cemento Argos", img: "/image/cementos-argos1.png", price: 70 },
  { name: "Panel de Yeso", img: "/image/panel-yeso1.png", price: 90 },
  { name: "Pintura Pintuco", img: "/image/pintuco1.png", price: 50 },
  { name: "Madera Estructural", img: "/image/madera-estructural1.png", price: 120 },
  { name: "Pinza", img: "/image/pinza1.png", price: 45 },
  { name: "Viniltex", img: "/image/viniltex.png", price: 100 },
  { name: "Martillo", img: "/image/martillo.png", price: 80 },
  { name: "Cincel", img: "/image/cincel.png", price: 60 },
  { name: "Serrucho", img: "/image/serrucho.png", price: 85 },
  { name: "Sika", img: "/image/sika.png", price: 75 },
];

function ProductoCard({ prod, isFav, onToggleFav, userLogged }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (typeof isFav === "boolean") {
      setAnimate(true);
      const timeout = setTimeout(() => setAnimate(false), 500);
      return () => clearTimeout(timeout);
    }
  }, [isFav]);

  const disabled = !userLogged;

  return (
    <div className="products-page__card">
      <img className="products-page__img" src={prod.img} alt={prod.name} />
      <h3 className="products-page__title">{prod.name}</h3>
      <p className="products-page__price">${prod.price}</p>
      <button className="products-page__btn">Agregar al carrito</button>
      <span className="products-page__fav-icon-wrapper">
        <img
          src={isFav ? "/image/favorito1.png" : "/image/favorito.png"}
          alt="Favorito"
          className={
            "products-page__fav-icon" +
            (animate ? " fav-icon--bright" : "") +
            (disabled ? " fav-icon--disabled" : "")
          }
          onClick={() => !disabled && onToggleFav(prod.name)}
          style={{ pointerEvents: disabled ? "none" : "auto" }}
        />
      </span>
    </div>
  );
}

const Products = () => {
  const { userLogged } = useAuthStore();
  const { favoritos, setFavorito, limpiarFavoritos } = useFavStore();

  useEffect(() => {
    if (!userLogged) limpiarFavoritos();
  }, [userLogged, limpiarFavoritos]);

  const handleToggleFav = (prodName) => {
    setFavorito(prodName, !favoritos[prodName]);
  };

  return (
    <div className="products-page">
      <h2 className="products-page__main-title">Todos los Productos</h2>
      <div className="products-page__grid">
        {productos.map((prod, idx) => (
          <ProductoCard
            prod={prod}
            key={idx}
            isFav={!!favoritos[prod.name]}
            onToggleFav={handleToggleFav}
            userLogged={userLogged}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
