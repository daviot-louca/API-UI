import RegisterForm from '../components/RegisterForm'
export default function RegisterPage({username,setUsername,email,setEmail,password,setPassword,handleRegister}){
    return <div>
        <RegisterForm
        username={username}
        setUsername={setUsername}
        email={email}
        setEmail={setEmail}
        password={password}
        setPassword={setPassword}
        handleRegister={handleRegister}
        />
    </div>
}