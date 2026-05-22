import { useEffect, useContext, useState } from "react";

import TicketListUser from "./TicketListUser";

import { TicketContext } from "../../context/TicketContext";
import { AuthContext } from "../../context/AuthContext";

import DashboardLayoutUser from "./DashboardLayoutUser";

//composants
import Profile from "../shared/Profile";
import ModalNouveauTicket from "../modals/modalNouveauTicket";
import ModalNouveauTypeTicket from "../modals/modalNouveauTypeTicket";
//function
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
        username,
        avatar,
        role
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
                        <Profile
                            username={username}
                            handleLogout={handleLogout}
                            role={role}
                            avatar={avatar}
                        />

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
                    <ModalNouveauTypeTicket
                    setIsTypeModalOpen={setIsTypeModalOpen}
                    handleSelectType={handleSelectType}
                    />
                }

                {/* FORM MODAL */}
                {isTicketModalOpen &&
                    <ModalNouveauTicket
                        setIsTicketModalOpen={
                            setIsTicketModalOpen
                        }
                        setIsTypeModalOpen={
                            setIsTypeModalOpen
                        }
                        type={type}
                        titre={titre}
                        setTitre={setTitre}
                        description={description}
                        setDescription={setDescription}
                        handleAjoutTicket={
                            handleAjoutTicket
                        }
                    />
                }

            </div>

        </DashboardLayoutUser>
    );
}

export default UserDashboard;