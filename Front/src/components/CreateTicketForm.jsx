function CreateTicketForm({titre, setTitre, description, setDescription, ajoutTicket}) {
    return <div>
        <div>
            <form action="" onSubmit={ajoutTicket}>
                <label htmlFor="">
                    Définissez le problème
                    <input type="text" placeholder="Titre" value={titre} onChange={(e) => setTitre(e.target.value)} />
                </label>
                <label htmlFor="">
                    Veuillez précisez le problème
                    <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    </div>
}

export default CreateTicketForm;