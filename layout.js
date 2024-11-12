export default function RootLayout({ children }) {
    return (
        <html lang="pt-BR">
        <head>
            <title>CargoShop - Dashboard</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"></link>
        </head>
        <body>
            <div className="container">
                <header className="d-flex justify-content-between align-items-center py-3">
                    <span className="menu-icon"><h3>☰</h3></span>
                    <a href="/"><h1>CargoShop</h1></a>
                    <div>
                        <a href="/usuario"><span className="user-icon"><h3>👤</h3></span></a>
                    </div>
                </header>
                <main>
                    {children}
                </main>
                <footer className="py-3">
                    &copy; 2024 CargoShop
                </footer>
            </div>
        </body>
        </html> 
    );
}