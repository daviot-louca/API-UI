export default function () {
  return (
    <div className="bg-white p-8">
      <div className="grid  grid-cols-6 ">
        <div className="flex items-center ml-30">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="" className="w-30" />
        </div>
        <div className="col-span-4 flex m-5 gap-10 justify-center">
          <div>
            <a href="#accueil" className="relative inline-block after:content-[''] after:rounded-full after:absolute after:left-0 after:-bottom-2 after:w-full after:h-1 after:bg-[#303030] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Acceuil</a>
          </div>
          <div>
            <a href="#fonctionnalites" className="relative inline-block after:content-[''] after:rounded-full after:absolute after:left-0 after:-bottom-2 after:w-full after:h-1 after:bg-[#303030] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">Fonctionnalités</a>
          </div>
          <div>
            <a href="#aPropos" className="relative inline-block after:content-[''] after:rounded-full after:absolute after:left-0 after:-bottom-2 after:w-full after:h-1 after:bg-[#303030] after:origin-left after:scale-x-0 after:transition-transform after:duration-300 hover:after:scale-x-100">A propos</a>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <p>© 2026 NovaDesk. Tous droits réservés.</p>
      </div>
    </div>
  );
}
