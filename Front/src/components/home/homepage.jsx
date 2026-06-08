import Navbar from "./navbar";
import Header from "./header";
import Fonctionnalites from "./fonctionnalites";
import Apropos from "./Apropos";
import Footer from "./footer";
import { Link } from "react-router-dom";
export default function Homepage() {
  return (
    <div className="min-h-screen bg-slate-100">
      <nav>
        <Navbar />
      </nav>
      <div className="mx-20">
        <header>
          <Header />
        </header>
        <div id="fonctionnalites">
          <Fonctionnalites />
        </div>
        <div id="aPropos">
          <Apropos />
        </div>
        <div>
          <section className="text-center py-32">
            <h2 className="text-6xl font-bold">
              Prêt à ne plus perdre
              <span className="text-[#2f5ea5]"> aucune demande ?</span>
            </h2>

            <p className="mt-6 mb-10 text-xl text-gray-600">
              Centralisez vos tickets, améliorez votre communication interne et
              offrez un meilleur suivi à vos collaborateurs.
            </p>

            <Link
              to="/register"
              className=" px-8 py-4 rounded-xl bg-[#2f5ea5] text-white font-semibold"
            >
              Créer un compte gratuitement
            </Link>
          </section>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
