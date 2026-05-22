import { useContext } from "react"
import {AuthContext} from '../../context/AuthContext'

export default function ProfilModal({
    username,
    email,
    setIsProfileModalOpen,
    setUsername,
    setEmail,
}){
    const {handleModifierProfil,id} = useContext(AuthContext);
    return <div onClick={()=> setIsProfileModalOpen(false)} className="fixed inset-0 bg-black/50 z-50">
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-3xl p-5 w-175" onClick={(e)=>e.stopPropagation()}>
                {/*entete */}
                <div className="flex flex-col items-center">
                    <h2 className="text-2xl font-bold">Modifier le profil</h2>
                    <p>Mettre à jour les informations personnelles</p>
                </div>
                {/*corps */}
                <div className="py-3">
                    {/*Partie avatar */}
                    <div className="flex flex-col items-center justify-center py-3">
                        <div className="w-30 h-30 rounded-full bg-[#303030] text-white flex items-center justify-center font-bold text-lg">
                            {username.slice(0,2).toUpperCase()}
                        </div>
                        <div>
                            <input type="file" name="" id="" />
                        </div>
                    </div>
                    {/*partie nom d'utilisateur mail et mot de passe*/}
                    <div>
                        <div>
                            <h2>Nom d'utilisateur</h2>
                            <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        <div>
                            <h2>Email</h2>
                            {console.log(email)}
                            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} />
                        </div>
                        <div className="py-5 flex justify-between px-3">
                            <button onClick={() => setIsProfileModalOpen(false)}>Annuler</button>
                            <button onClick={()=>{handleModifierProfil(id,email,username); setIsProfileModalOpen(false)}}>Enregistrer les modifications</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}