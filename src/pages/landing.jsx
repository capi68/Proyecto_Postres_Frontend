import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Logo-Wikipostres.svg?react";


export default function Landing() {
    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");
    const [showRegister, setShowRegister] = useState(false);
    const [error, setError] = useState("");
    //Register
    const [registerName, setRegisterName] = useState("");
    const [registerEmail, setRegisterEmail] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    //State for diferent password/confirm password
    const [diferentPassword, setDiferentPassword] = useState("");
    const navigate = useNavigate();

    //Login Box 
    const handleLogin = async (e) => {
        e.preventDefault();
        try {

          //normalization
            const email = loginEmail.toLowerCase().trim();
            const password = loginPassword; 

            const res = await axios.post("http://localhost:3000/users/login", {
                email,
                password,
            });

            localStorage.setItem("token", res.data.token); //save token
            localStorage.setItem("user", JSON.stringify(res.data.user));
            navigate("/products"); //redirect to products


        } catch(error) {
            setError(error.response?.data?.message || "Error al iniciar sesion");
        }
    };

    //Register Modal box
    const handleRegister = async (e) => {
      e.preventDefault();
      if(registerPassword !== confirmPassword) {
        setDiferentPassword("Las contraseñas no coinciden");
        return
      }
      try {

        const email = registerEmail.toLowerCase().trim();
        const name = registerName.toLowerCase().trim();
        const password = registerPassword;

        await axios.post("http://localhost:3000/users/register", {
          name,
          email,
          password,
        });
        alert("Fuiste registrado con exito!! vamos por un postre..!!!");
        setShowRegister(false);
      } catch(error) {
        alert ("Error al registrarte");
      }
    };



    return (
    <div className="relative w-screen h-screen">
      {/* Imagen de fondo */}
      <img
        src="/images/landing_image.jpg"
        alt=""
        className="
            absolute 
            inset-0 
            w-full lg:w-[65%] 
            h-full 
            object-cover 
            z-10"
      />
      {/* Overlay black*/}
      <div className="
              absolute 
              inset-0 
              w-full lg:w-[65%]  
              bg-black/30 
              flex 
              items-center 
              justify-center 
              z-20">
      </div>

      {/* Logo content*/}
      <div className="
              absolute 
              w-full   lg:w-[35%]  
              flex flex-col 
              items-center 
              top-8  
              lg:right-0  
              z-30 
              text-[var(--color-bg)] lg:text-[var(--color-brand)]"
      >
      <Logo className="w-[50%] md:w-[50%] lg:w-[40%] 2xl:w-[50%] h-auto" />
      <h2 className="  font-[Lora] italic font-bold text-5xl">Caffe</h2>
      </div>

      {/* Overlay login */}
      <div className="
              absolute 
              inset-0 lg:inset-auto
              lg:top-0 lg:right-0 lg:bottom-0
              lg:bg-[var(--color-bg)] 
              w-full lg:w-[35%]
              flex 
              justify-center lg:justify-end 
              items-center 
              z-40 lg:z-0"
        >
        <div className="
                  2xl:flex 2xl:flex-col 2xl:items-center 2xl:justify-evenly
                  p-8 
                  2xl:h-[40%]
                  mt-24 md:mt-0
                  rounded-2xl  
                  lg:md:w-96 xl:w-full  
                  backdrop-blur-sm
                  border border-[var(--color-bg)]">
          <h2 className="
                  text-2xl 2xl:text-5xl
                  mb-6 
                  text-center 
                  font-[Lora] 
                  font-thin 
                  text-[var(--color-bg)] lg:text-[var(--color-brand)]"
          >
            Iniciar Sesión
          </h2>

          <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full 2xl:h-12 p-2 mb-4 border border-[var(--color-secondary)] rounded-lg"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full 2xl:h-12 p-2 mb-4 border border-[var(--color-secondary)] rounded-lg"
          />

          <button
            type="submit"
            className="
                w-full 
                2xl:h-12
                bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] 
                text-white 
                font-Josefin 
                py-2 
                rounded-lg 
                font-semibold"
          >
            Entrar
          </button>

          <p className="text-red-500 text-sm mt-3">{error}</p>
          </form>


          {/* Register Link */}
          <p className="
                mt-4 
                text-left 
                text-sm 2xl:text-xl
                text-[var(--color-bg)] lg:text-[var(--color-brand)]"
          >
            ¿No tienes cuenta?{" "}

          <button onClick={() => setShowRegister(true)} 
                  className="
                        text-[var(--color-success)] lg:text-[var(--color-secondary)] 
                        font-Josefin 
                        font-semibold "
          >
            Registrate
          </button>
          </p>
        </div>
      </div>


        {/* Register modal */}
        {showRegister && (
          <div className="
                  absolute 
                  inset-0 
                  bg-black/50 
                  flex 
                  items-center 
                  justify-center 
                  z-40"
          >
          <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center font-[lora] text-[var(--color-brand)]">Crear Cuenta</h2>

            <form onSubmit={handleRegister}>
              <input 
                type="text"
                placeholder="Nombre"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="w-full p-2 mb-3 border border-[var(--color-secondary)] rounded-lg" 
              />

              <input 
                type="email"
                placeholder="Correo"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="w-full p-2 mb-3 border border-[var(--color-secondary)] rounded-lg"
              />

              <input 
                type="password"
                placeholder="Contraseña" 
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="w-full p-2 mb-3 border border-[var(--color-secondary)] rounded-lg"
              />

              <input 
                type="password"
                placeholder="Conrfirmar contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 mb-3 border border-[var(--color-secondary)] rounded-lg" 
              />
              {diferentPassword && (
                <p className="text-red-600 text-sm mb-2">{diferentPassword}</p>
              )}
              <div className="flex justify-between">
                <button 
                  type="button"   
                  onClick={() => setShowRegister(false)}
                  className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-lg font-[Lora]"
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="px-4 py-2 bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-white rounded-lg font-[Lora]"
                >
                  Registrarse
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
  </div>
  );
}