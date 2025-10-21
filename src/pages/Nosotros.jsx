import React from "react";
import NavBar from "../components/NavBar";
import { useLocation, useNavigate } from "react-router-dom";

export default function Nosotros() {
    const location = useLocation();
    const navigate = useNavigate();

  return (
    <div className="
              min-h-screen 
              bg-[var(--color-bg)] 
              flex flex-col"
    >
      <NavBar />

      <main className="
              flex-grow 
              flex flex-col 
              items-center 
              justify-center 
              px-8 
              py-12 
              text-center"
      >
        <h1 className="
              text-4xl md:text-5xl 
              font-bold 
              font-Lora 
              text-[var(--color-text)] 
              mb-6"
        >
          Nuestra Historia 
        </h1>

        <div className="
              max-w-3xl 
              text-[var(--color-text)] 
              text-lg 
              leading-relaxed 
              font-Josefin 
              bg-white/70 
              p-8 
              rounded-2xl 
              shadow-md"
        >
          <p className="mb-6">
            En <span className="font-semibold text-[var(--color-accent)]">Wikipostres</span> creemos que los mejores
            momentos de la vida se disfrutan con un buen postre. Nuestra historia
            comenzó en <strong>2015</strong>, cuando decidimos transformar la pasión por la
            repostería artesanal en un pequeño taller dedicado a crear delicias
            únicas, hechas con amor y los mejores ingredientes.
          </p>

          <p className="mb-6">
            Con el tiempo, fuimos perfeccionando cada receta hasta dar vida a
            nuestro <strong>producto estrella: el croissant bicolor de chocolate</strong>, una
            combinación perfecta entre textura, sabor y estética que rápidamente
            se convirtió en el favorito de nuestros clientes.
          </p>

          <p className="mb-6">
            Desde <strong>2022</strong>, ampliamos nuestra experiencia dulce con el mundo
            del café, incorporando el <strong>varismo</strong> y una amplia variedad de cafés
            especiales cuidadosamente seleccionados, para acompañar y realzar
            cada uno de nuestros postres.
          </p>

          <p className="font-semibold text-[var(--color-chocolate)] text-xl">
            Hoy, seguimos creciendo con la misma esencia de nuestros inicios:  
            <br />
            <span className="text-[var(--color-accent)]">
              hacer de cada bocado una experiencia artesanal, auténtica y memorable.
            </span>
          </p>
        </div>
      </main>

    </div>
  );
}
