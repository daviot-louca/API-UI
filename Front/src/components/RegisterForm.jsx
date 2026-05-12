function RegisterForm({ handleRegister, username, setUsername, email, setEmail, password, setPassword }) {
    return <div>
        <form onSubmit={handleRegister}>

            <h2>Inscription</h2>

            <label>
                Username
                <input
                    type="text"
                    placeholder="test"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
            </label>
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
                S'inscrire
            </button>

        </form>
    </div>

}

export default RegisterForm;