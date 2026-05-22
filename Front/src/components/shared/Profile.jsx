export default function Profile({ username, handleLogout,role,avatar,setIsProfileModalOpen }){
    return (

        <div className="relative group">

            <button className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm hover:bg-gray-50 transition">

                {/* AVATAR */}
                <div className="w-12 h-12 rounded-full bg-[#303030] text-white flex items-center justify-center font-bold text-lg">

                    {avatar}

                </div>

                {/* INFOS */}
                <div className="text-left">

                    <p className="font-semibold text-gray-800">

                        {username}

                    </p>

                    <p className="text-sm text-gray-500">

                        {role}

                    </p>

                </div>

            </button>

            {/* DROPDOWN */}
            <div className="absolute right-0 top-18 w-56 bg-white rounded-2xl shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">

                <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-500 transition"
                >
                    Se déconnecter
                </button>
                <button
                    onClick={()=>setIsProfileModalOpen(true)}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 transition"
                >
                    Modifier le profil
                </button>

            </div>

        </div>
    )
}
