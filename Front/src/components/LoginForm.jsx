function LoginForm({email,password,setEmail,setPassword,handleSubmit}){

    return <div>
        <form onSubmit={handleSubmit}>

        <h2>Connexion</h2>

        <label>
          Email :
          <input
            type="text"
            placeholder="test.exemple@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </label>

        <label>
          Password :
          <input
            type="password"
            placeholder="*************"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </label>

        <button type="submit">
          Se connecter
        </button>

      </form>
    </div>
}

export default LoginForm;