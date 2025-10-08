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
            const res = await axios.post("http://localhost:3000/users/login", {
                email: loginEmail,
                password: loginPassword,
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
        await axios.post("http://localhost:3000/auth/register", {
          name: registerName,
          email: registerEmail,
          password: registerPassword,
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
        src="/landing-image.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-1"></div>
      <div className="absolute flex flex-col items-center top-48  z-20">
      <Logo className=" text-white  w-[50%] h-auto"  />
      <h2 className=" text-white font-[Lora] italic font-bold text-6xl">Caffe</h2>
      </div>

      {/* Overlay login */}
      <div className="absolute inset-0 flex justify-end items-center z-10">
        <div className="bg-white/80 p-8 rounded-2xl shadow-lg w-96 mr-10">
          <h2 className="text-2xl mb-6 text-center font-[Josefin_Sans] font-thin ">Iniciar Sesión</h2>

          <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Correo"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            className="w-full p-2 mb-4 border rounded-lg"
          />

          <button
            type="submit"
            className="w-full bg-[#e5ada8] hover:bg-[#d18f88] text-white font-[Josefin_Sans] py-2 rounded-lg font-semibold"
          >
            Entrar
          </button>
          <p className="text-red-500 text-sm mt-3">{error}</p>
          </form>


          {/* Register Link */}
          <p className="mt-4 text-left text-sm">¿No tienes cuenta?{" "}
          <button onClick={() => setShowRegister(true)} className="text-[var(--color-brand-dark)] font-[Josefin_Sans] font-semibold ">
            Registrate
          </button>
          </p>
        </div>
      </div>
        {/* Register modal */}
        {showRegister && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-20">
            <div className="bg-white p-6 rounded-2xl w-96 shadow-lg">
              <h2 className="text-xl font-bold mb-4 text-center">Crear Cuenta</h2>

              <form onSubmit={handleRegister}>
                <input 
                  type="text"
                  placeholder="Nombre"
                  value={registerName}
                  onChange={(e) => setRegisterName(e.target.value)}
                  className="w-full p-2 mb-3 border rounded-lg" 
                />

                <input 
                  type="email"
                  placeholder="Correo"
                  value={registerEmail}
                  onChange={(e) => setRegisterEmail(e.target.value)}
                  className="w-full p-2 mb-3 border rounded-lg"
                />

                <input 
                  type="password"
                  placeholder="Contraseña" 
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  className="w-full p-2 mb-3 border rounded-lg"
                />

                <input 
                  type="password"
                  placeholder="Conrfirmar contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-2 mb-3 border rounded-lg" 
                />
                {diferentPassword && (
                  <p className="text-red-600 text-sm mb-2">{diferentPassword}</p>
                )}
                <div className="flex justify-between">
                  <button 
                    type="button"   
                    onClick={() => setShowRegister(false)}
                    className="px-4 py-2 bg-gray-300 rounded-lg"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="px-4 py-2 bg-[var(--color-brand)] hover:bg-[var(--color-brand-dark)] text-white rounded-lg"
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