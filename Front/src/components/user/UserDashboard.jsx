import { useEffect, useContext, useState } from "react";

import TicketListUser from "./TicketListUser";

import { TicketContext } from "../../context/TicketContext";
import { AuthContext } from "../../context/AuthContext";

import DashboardLayoutUser from "./DashboardLayoutUser";

function UserDashboard() {

    const {
        ajoutTicket,
        voirTicket,
        currentPage,
        selectedStatus,
        voirStatsTicket
    } = useContext(TicketContext);

    const {
        handleLogout,
        username
    } = useContext(AuthContext);

    // FORM STATES
    const [type, setType] =
        useState("");

    const [titre, setTitre] =
        useState("");

    const [description, setDescription] =
        useState("");

    // MODALS
    const [isTypeModalOpen, setIsTypeModalOpen] =
        useState(false);

    const [isTicketModalOpen, setIsTicketModalOpen] =
        useState(false);

    // SELECT TYPE
    const handleSelectType = (
        selectedType
    ) => {

        setType(selectedType);

        setIsTypeModalOpen(false);

        setIsTicketModalOpen(true);
    };

    // SUBMIT
    const handleAjoutTicket =
        async (e) => {

            e.preventDefault();

            await ajoutTicket(
                type,
                titre,
                description
            );

            setType("");

            setTitre("");

            setDescription("");

            setIsTicketModalOpen(false);
        };

    // FETCH
    useEffect(() => {

        voirTicket(
            currentPage,
            selectedStatus
        );

        voirStatsTicket();

    }, [currentPage, selectedStatus]);

    return (

        <DashboardLayoutUser>

            <div className="flex flex-col gap-8 px-8 pt-8 w-full bg-slate-100 min-h-screen">

                {/* TOP */}
                <div className="flex items-start justify-between">

                    {/* LEFT */}
                    <div>

                        <h1 className="text-4xl font-bold text-[#303030]">

                            Dashboard

                        </h1>

                        <p className="text-[#303030] mt-2 text-lg">

                            Bienvenue {username}. Voici vos tickets.

                        </p>

                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-5">

                        {/* PROFILE */}
                        <div className="relative group">

                            <button className="flex items-center gap-3 bg-[#303030] px-4 py-2 rounded-2xl shadow-sm">

                                {/* AVATAR */}
                                <div className="w-12 h-12 rounded-full bg-slate-100 text-[#303030] flex items-center justify-center font-bold text-lg">

                                    {
                                        username
                                            ?.slice(0, 2)
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

                            <h1 className="mt-4 font-bold text-2xl text-[#303030]">

                                Mes Tickets

                            </h1>

                            <button
                                onClick={() =>
                                    setIsTypeModalOpen(true)
                                }
                                className="mt-3 bg-[#303030] hover:bg-[#505050] text-slate-100 rounded-xl px-5 py-3 font-semibold transition"
                            >
                                + Nouveau ticket
                            </button>

                        </div>

                        {/* TABLE HEADER */}
                        <div className="grid grid-cols-[40px_140px_150px_500px_180px_190px] p-3 mt-5 font-semibold text-[#303030]">

                            <div className="mx-3">id</div>

                            <div className="mx-3">type</div>

                            <div className="mx-3">titre</div>

                            <div className="mx-3">description</div>

                            <div className="mx-3">status</div>

                            <div className="mx-3">date de création</div>

                        </div>

                        <hr className="mr-25" />

                        {/* LIST */}
                        <TicketListUser />

                    </div>

                </div>

                {/* TYPE MODAL */}
                {isTypeModalOpen &&

                    <div
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() =>
                            setIsTypeModalOpen(false)
                        }
                    >

                        <div className="flex items-center justify-center min-h-screen">

                            <div
                                className="bg-white rounded-3xl p-10 w-175"
                                onClick={(e) =>
                                    e.stopPropagation()
                                }
                            >
                                <div className="flex justify-between">
                                <h1 className="text-3xl font-bold text-[#303030] mb-10">
                                    Choisissez un type de problème
                                </h1>
                                <button onClick={()=>setIsTypeModalOpen(false)} className="mb-10 bg-[#303030] text-white rounded-full px-3">X</button>
                                </div>

                                <div className="grid grid-cols-2 gap-5">

                                    <button
                                        onClick={() =>
                                            handleSelectType("Poste de travail")
                                        }
                                        className="bg-slate-100 hover:bg-slate-200 rounded-2xl p-8 text-xl font-semibold transition"
                                    >
                                        Poste de travail
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleSelectType("téléphonie")
                                        }
                                        className="bg-slate-100 hover:bg-slate-200 rounded-2xl p-8 text-xl font-semibold transition"
                                    >
                                        Téléphonie
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleSelectType("compte d'accès")
                                        }
                                        className="bg-slate-100 hover:bg-slate-200 rounded-2xl p-8 text-xl font-semibold transition"
                                    >
                                        Compte d'accès
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleSelectType("messagerie")
                                        }
                                        className="bg-slate-100 hover:bg-slate-200 rounded-2xl p-8 text-xl font-semibold transition"
                                    >
                                        Messagerie
                                    </button>

                                    <button
                                        onClick={() =>
                                            handleSelectType("autres")
                                        }
                                        className="col-span-2 bg-slate-100 hover:bg-slate-200 rounded-2xl p-8 text-xl font-semibold transition"
                                    >
                                        Autres
                                    </button>

                                </div>

                            </div>

                        </div>

                    </div>
                }

                {/* FORM MODAL */}
                {isTicketModalOpen &&

                    <div
                        className="fixed inset-0 bg-black/50 z-50"
                        onClick={() =>
                            setIsTicketModalOpen(false)
                        }
                    >

                        <div className="flex items-center justify-center min-h-screen">

                            <div
                                className="bg-slate-100 rounded-3xl p-8 w-225"
                                onClick={(e) =>
                                    e.stopPropagation()
                                }
                            >

                                <h1 className="text-3xl font-bold text-[#303030]">

                                    Nouveau ticket

                                </h1>

                                <p className="text-[#505050] mt-2 text-lg">

                                    Type sélectionné :

                                    <span className="font-bold ml-2">

                                        {type}

                                    </span>

                                </p>

                                <form
                                    onSubmit={handleAjoutTicket}
                                    className="flex flex-col"
                                >

                                    {/* TITRE */}
                                    <div className="flex flex-col">

                                        <label
                                            htmlFor="titre"
                                            className="text-xl mt-10 text-[#303030] font-bold"
                                        >
                                            Définissez le problème
                                        </label>

                                        <input
                                            id="titre"
                                            type="text"
                                            placeholder="Titre"
                                            value={titre}
                                            onChange={(e) =>
                                                setTitre(e.target.value)
                                            }
                                            className="bg-white p-3 rounded-xl my-5"
                                        />

                                    </div>

                                    {/* DESCRIPTION */}
                                    <div className="flex flex-col">

                                        <label
                                            htmlFor="description"
                                            className="text-xl mt-5 text-[#303030] font-bold"
                                        >
                                            Veuillez préciser le problème
                                        </label>

                                        <textarea
                                            id="description"
                                            placeholder="Description"
                                            value={description}
                                            onChange={(e) =>
                                                setDescription(e.target.value)
                                            }
                                            className="bg-white p-3 rounded-xl my-5 h-50"
                                        />

                                    </div>

                                    {/* BUTTONS */}
                                    <div className="flex justify-between mt-5">

                                        <button
                                            type="button"
                                            onClick={() => {

                                                setIsTicketModalOpen(false);

                                                setIsTypeModalOpen(true);
                                            }}
                                            className="bg-slate-600 text-white rounded-xl px-5 py-3"
                                        >
                                            Retour
                                        </button>

                                        <button
                                            type="submit"
                                            className="bg-[#303030] text-white rounded-xl px-5 py-3"
                                        >
                                            Envoyer
                                        </button>

                                    </div>

                                </form>

                            </div>

                        </div>

                    </div>
                }

            </div>

        </DashboardLayoutUser>
    );
}

export default UserDashboard;