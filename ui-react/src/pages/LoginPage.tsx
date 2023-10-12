import LoginBox from "../components/LoginBox";
import PageHeader from "../components/PageHeader";

export default function LoginPage() {

    async function handleLogin(email : string, password : string){
        let apiEndpoint = 'https://localhost:5069/user/login?user=' + email +
            "&pin=" + password
        let response = await fetch(apiEndpoint, {mode:"no-cors"})
        alert(response.statusText)
    }

    return (
        <>
            <PageHeader
                title="Iniciar Sesión"
                subtitle="Utiliza tus credenciales de Intratime" />
            
            <div className="container py-4 ">
                <LoginBox onLoginButtonClicked={handleLogin}/>
            </div>
        </>
    )
}