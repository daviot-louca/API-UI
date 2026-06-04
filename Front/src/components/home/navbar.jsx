import { Link } from "react-router-dom";
import { LogInIcon } from "lucide-react";
export default function Navbar() {
  return (
    <div className="flex justify-around py-4 bg-white">
      {/**logo */}
      <div className="flex items-center">
        <img src="../../../public/logo.png" alt="" className="w-30" />
      </div>
      {/**navbar */}
      <div className="flex items-center gap-20">
        <div>
          <a href="">Acceuil</a>
        </div>
        <div>
          <a href="">Fonctionnalités</a>
        </div>
        <div>
          <a href="">Tarifs</a>
        </div>
        <div>
          <a href="">A propos</a>
        </div>
        <div>
          <a href="">Contact</a>
        </div>
      </div>
      {/**button */}
      <div className="flex gap-6">
        <div className="flex items-center gap-3 font-semibold hover:text-gray-500 transition-colors cursor-pointer">
          <LogInIcon size={12} className="hover:text-gray-500" />
          <div>
            <Link to="/login">Se connecter</Link>
          </div>
        </div>
        <div className="flex">
          <Link
            to="/register"
            className="py-2 px-4 bg-[#303030] font-medium text-white rounded-xl hover:bg-[#505050] hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            Créer un compte
          </Link>
        </div>
      </div>
    </div>
  );
}
