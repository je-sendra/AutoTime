import PageHeader from "../components/PageHeader";

export default function GitHubPage() {
    return (
        <>
            <PageHeader
                title="REPOSITORIO"
                subtitle="El repositorio de GH se incrustará aquí." />
            El repositorio es el almacén en el que se guarda la base de código
            de la aplicación.
            <br></br>
            De momento, se puede acceder desde la opción "Abrir en GitHub" o desde
            <a
                href="https://github.com/VewTech/AutoTime"
                target="_blank"
                rel="noreferrer"
            >  
                este enlace.
            </a>
        </>
    )
}