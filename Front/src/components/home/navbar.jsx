import { Link } from "react-router-dom";
import { LogInIcon } from "lucide-react";
export default function Navbar() {
  return (
    <div className="flex justify-around py-4 bg-white">
      {/**logo */}
      <div className="flex items-center">
        <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="w-30" />
      </div>
      {/**navbar */}
      <div className="flex items-center gap-20">
        <div className="inline-block">
          <a
            href="#"
            className="relative inline-block after:content-[''] after:rounded-full after:absolute after:left-0 after:-bottom-6 after:w-full after:h-1 after:bg-[#303030] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            Acceuil
          </a>
        </div>
        <div>
          <a
            href="#fonctionnalites"
            className="relative inline-block after:content-[''] after:rounded-full after:absolute after:left-0 after:-bottom-6 after:w-full after:h-1 after:bg-[#303030] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            Fonctionnalités
          </a>
        </div>
        <div>
          <a
            href="#aPropos"
            className="relative inline-block after:content-[''] after:rounded-full after:absolute after:left-0 after:-bottom-6 after:w-full after:h-1 after:bg-[#303030] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100"
          >
            A propos
          </a>
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
