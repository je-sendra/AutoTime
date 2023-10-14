import LoginBox from "../components/LoginBox";
import PageHeader from "../components/PageHeader";
import axios from "axios"

interface LoginPageProps {
    onSuccess: (token : string)=>void
}

export default function LoginPage({  onSuccess = () => {}}: LoginPageProps) {

    async function handleLogin(email : string, password : string){
        let apiEndpoint = 'https://autotime-api.azurewebsites.net/user/login?user=' + email +
            "&pin=" + password
        let response = await axios.post(apiEndpoint)
        if(response.status === 200) onSuccess(response.data.useR_TOKEN)
    }

    return (
        <>
            <PageHeader
                title="INICIAR SESIÓN"
                subtitle="Utiliza tus credenciales de Intratime" />
            
            <div className="container py-4 ">
                <LoginBox onLoginButtonClicked={handleLogin}/>
            </div>
        </>
    )
}