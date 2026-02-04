import './globals.css'

export const metadata = {
  title: 'Prescription Review',
  description: 'HITL review screens for prescription standardization',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="app-shell">
          <header className="app-header">
            <div className="app-title">Prescription Review Console</div>
            <nav className="app-nav">
              <a href="/">Home</a>
              <a href="/review">Review Queue</a>
            </nav>
          </header>
          <main className="app-main">{children}</main>
        </div>
      </body>
    </html>
  )
}
