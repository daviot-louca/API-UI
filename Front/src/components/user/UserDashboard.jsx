import { useEffect, useContext, useState } from "react";

import { Link } from "react-router-dom";

import TicketListUser from "./TicketListUser";

import { TicketContext } from "../../context/TicketContext";
import { AuthContext } from "../../context/AuthContext";

import DashboardLayoutUser from "../user/DashboardLayoutUser";

function UserDashboard() {

    const { ajoutTicket } = useContext(TicketContext);

    const [titre, setTitre] = useState("");
    const [description, setDescription] = useState("");
    const [isTicketOpen,setIsTicketOpen] = useState(false)
    const handleAjoutTicket = async (e) => {

        e.preventDefault();

        await ajoutTicket(
            titre,
            description
        );

        setTitre("");
        setDescription("");
    };
    const {
        voirTicket,
        currentPage
    } = useContext(TicketContext);

    const {
        handleLogout,
        username
    } = useContext(AuthContext);

    useEffect(() => {

        voirTicket(currentPage);

    }, [currentPage]);

    return (

        <DashboardLayoutUser>

            <div className="flex flex-col gap-8 px-8 pt-8 w-full bg-slate-100 min-h-screen">

                {/* TOP */}
                <div className="flex items-start justify-between">

                    {/* LEFT */}
                    <div>

                        <h1 className="text-4xl font-bold text-slate-800">

                            Dashboard

                        </h1>

                        <p className="text-slate-800 mt-2 text-lg">

                            Bienvenue {username}. Voici vos tickets.

                        </p>

                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-5">

                        {/* PROFILE */}
                        <div className="relative group">

                            <button className="flex items-center gap-3 bg-slate-800 px-4 py-2 rounded-2xl shadow-sm">

                                {/* AVATAR */}
                                <div className="w-12 h-12 rounded-full bg-slate-400 text-white flex items-center justify-center font-bold text-lg">

                                    {
                                        username
                                            ?.slice(0,2)
                                            ?.toUpperCase()
                                    }

                                </div>

                                {/* INFOS */}
                                <div className="text-left">

                                    <p className="font-semibold text-gray-100">

                                        {username}

                                    </p>

                                    <p className="text-sm text-gray-400">

                                        utilisateur

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

                            </div>

                        </div>

                    </div>

                </div>

                {/* TICKETS */}
                <div className="flex flex-col bg-white rounded-2xl p-6 shadow-sm">

                    <div className="ml-15">

                        {/* HEADER */}
                        <div className="flex items-center justify-between mr-25">

                            <h1 className="mt-4 font-bold text-2xl text-slate-800">

                                Mes Tickets

                            </h1>

                            <button
                                onClick={()=>setIsTicketOpen(true)}
                                className="mt-3 bg-slate-800 hover:bg-slate-700 text-slate-100 rounded-xl px-5 py-3 font-semibold transition"
                            >
                                + Nouveau ticket
                            </button>

                        </div>

                        {/* TABLE HEADER */}
                        <div className="grid grid-cols-5 p-5 mt-5 font-semibold text-slate-700">

                            <div>id</div>

                            <div>titre</div>

                            <div>description</div>

                            <div>status</div>

                            <div>date de création</div>

                        </div>

                        <hr className="mr-25" />

                        {/* LIST */}
                        <TicketListUser />


                    </div>

                </div>
                {/*modal */}
                {isTicketOpen &&
                <div className="fixed inset-0 bg-black/50" onClick={()=>setIsTicketOpen(false)}>
                    <div className="flex items-center justify-center min-h-screen">
                        <div className="bg-slate-100 rounded-3xl p-8 w-250 h-120" onClick={(e) => e.stopPropagation()}>
                            <h1 className="text-3xl font-bold text-slate-800">Créer un nouveau ticket</h1>
                            <div>
                                <form
                                    onSubmit={handleAjoutTicket}
                                    className="flex flex-col">
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="titre"
                                            className="text-xl mt-10 text-slate-800 font-bold">Définissez le problème</label>

                                        <input
                                            id="titre"
                                            type="text"
                                            placeholder="Titre"
                                            value={titre}
                                            onChange={(e) =>
                                                setTitre(e.target.value)
                                            }
                                            className="bg-white p-3 rounded-xl my-5" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label
                                            htmlFor="description"
                                            className="text-xl mt-5 text-slate-800 font-bold">
                                            Veuillez préciser le problème
                                        </label>

                                        <textarea
                                            id="description"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            className="bg-white p-3 rounded-xl my-5" />
                                    </div>
                                    <div className="flex justify-between m-3">
                                        <div className="">
                                            <button type="button" onClick={()=>setIsTicketOpen(false)} className="inline-block bg-slate-800 text-slate-100 rounded-xl p-3">Annuler</button>
                                        </div>
                                        <div className="">
                                            <button type="submit" className="bg-slate-800 p-3 text-slate-100 rounded-xl">Envoyer</button>
                                        </div>
                                    </div>

                                </form>

                            </div>
                        </div>


                    </div>
                </div>
                }
            </div>


        </DashboardLayoutUser>
    );
}

export default UserDashboard;