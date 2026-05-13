
function UserList ({users,deleteAll,supprimerUser}){
    return <div>
                  <div>
            <div>
              <h2>liste des utilisateurs :</h2>
              <button onClick={deleteAll}>Réinitialiser</button>
            </div>

            {users.map((user) => (
              <div key={user.id}>
                <div>
                  <p>{user.id}</p>
                </div>
                <div>
                  <p>{user.username}</p>
                </div>
                <div>
                  <p>{user.email}</p>
                </div>
                <div>
                  <p>{user.role}</p>
                </div>
                <div>
                  <button onClick={()=>supprimerUser(user.id)}>Supprimer l'utilisateur</button>
                </div>
              </div>
            ))}
          </div>
    </div>
}

export default UserList;