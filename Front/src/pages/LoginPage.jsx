import LoginForm from '../components/LoginForm'

export default function LoginPage({email,password,setEmail,setPassword,handleSubmit}){
    return <div>
            <LoginForm
    email={email}
    password={password}
    setEmail={setEmail}
    setPassword={setPassword}
    handleSubmit={handleSubmit}
    />
    </div>

}