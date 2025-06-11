import { useParams } from "react-router";
import { useEffect, useState } from "react";
import "./Categoria.css";

const imagenDummy = "https://via.placeholder.com/300x200.png?text=Producto";

const mockProductos = [
  ...Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    nombre: `Producto Acabado ${i + 1}`,
    categoria: "acabados",
    precio: 45000 + i * 500,
    img: imagenDummy,
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 100 + i + 1,
    nombre: `Producto Carpinteria ${i + 1}`,
    categoria: "carpinteria",
    precio: 220000 + i * 10000,
    img: imagenDummy,
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 200 + i + 1,
    nombre: `Producto Construccion ${i + 1}`,
    categoria: "construccion",
    precio: 1800 + i * 100,
    img: imagenDummy,
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 300 + i + 1,
    nombre: `Producto Plomeria ${i + 1}`,
    categoria: "plomeria",
    precio: 7500 + i * 250,
    img: imagenDummy,
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 400 + i + 1,
    nombre: `Producto Panel ${i + 1}`,
    categoria: "panel",
    precio: 30000 + i * 1000,
    img: imagenDummy,
  })),
  ...Array.from({ length: 20 }, (_, i) => ({
    id: 500 + i + 1,
    nombre: `Producto Enchape ${i + 1}`,
    categoria: "enchape",
    precio: 35000 + i * 1200,
    img: imagenDummy,
  })),
];

const Categoria = () => {
  const { nombre } = useParams();
  const [productos, setProductos] = useState([]);
  const [modoEdicion, setModoEdicion] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    id: null,
    nombre: "",
    precio: "",
    img: "",
  });

  useEffect(() => {
    const filtrados = mockProductos
      .filter((prod) => prod.categoria === nombre.toLowerCase())
      .sort((a, b) => a.nombre.localeCompare(b.nombre));
    setProductos(filtrados);
  }, [nombre]);

  const capitalizar = (texto) =>
    texto ? texto.charAt(0).toUpperCase() + texto.slice(1) : "";

  const handleChange = (e) => {
    setNuevoProducto({ ...nuevoProducto, [e.target.name]: e.target.value });
  };

  const handleAgregar = (e) => {
    e.preventDefault();
    if (!nuevoProducto.nombre || !nuevoProducto.precio) return;

    if (modoEdicion) {
      setProductos((prev) =>
        prev.map((p) =>
          p.id === nuevoProducto.id
            ? {
                ...p,
                nombre: nuevoProducto.nombre,
                precio: Number(nuevoProducto.precio),
                img: nuevoProducto.img || imagenDummy,
              }
            : p
        )
      );
      setModoEdicion(false);
    } else {
      const nuevo = {
        ...nuevoProducto,
        id: Date.now(),
        categoria: nombre.toLowerCase(),
        precio: Number(nuevoProducto.precio),
        img: nuevoProducto.img || imagenDummy,
      };
      setProductos((prev) => [...prev, nuevo].sort((a, b) => a.nombre.localeCompare(b.nombre)));
    }

    setNuevoProducto({ id: null, nombre: "", precio: "", img: "" });
  };

  const handleEditar = (producto) => {
    setModoEdicion(true);
    setNuevoProducto(producto);
  };

  const handleEliminar = (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este producto?");
    if (confirm) {
      setProductos((prev) => prev.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="categoria-page">
      <h2 className="categoria-title">Categoría: {capitalizar(nombre)}</h2>

      <form onSubmit={handleAgregar} className="formulario-producto">
        <input
          name="nombre"
          placeholder="Nombre del producto"
          value={nuevoProducto.nombre}
          onChange={handleChange}
          required
        />
        <input
          name="precio"
          type="number"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={handleChange}
          required
        />
        <input
          name="img"
          placeholder="URL de imagen"
          value={nuevoProducto.img}
          onChange={handleChange}
        />

        <div className="botones-form">
          <button type="submit" className="btn-pequeno">
            {modoEdicion ? "Actualizar" : "Agregar"}
          </button>
          {modoEdicion && (
            <button
              type="button"
              className="btn-pequeno btn-cancelar"
              onClick={() => {
                setModoEdicion(false);
                setNuevoProducto({ id: null, nombre: "", precio: "", img: "" });
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      {productos.length > 0 ? (
        <div className="productos-grid">
          {productos.map((prod) => (
            <div key={prod.id} className="producto-card">
              <img src={prod.img || imagenDummy} alt={prod.nombre} />
              <h3>{prod.nombre}</h3>
              <p>Precio: ${prod.precio.toLocaleString("es-CO")}</p>
              <div className="acciones">
                <button className="btn-pequeno" onClick={() => handleEditar(prod)}>
                  Editar
                </button>
                <button
                  className="btn-pequeno btn-eliminar"
                  onClick={() => handleEliminar(prod.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="sin-resultados">No hay productos en esta categoría.</p>
      )}
    </div>
  );
};

export default Categoria;
