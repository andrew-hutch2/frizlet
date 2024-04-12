import '@styles/globals.css';
import Nav from "@components/Nav"
import Provider from "@components/Provider";



  
export const metadate = {
    title: "Frizlet",
    description: " Free way to study and learn easily"
}

function RootLayout({children}) {

  return (
    <html lang='en'>
        <body>
            <Provider>
                <div className='main'>
                    <div className='gradient'/>
                </div>
                <main className='app'>
                    <Nav/> 
                    {children}
                </main>
            </Provider>
        </body>
    </html>
  )
}

export default RootLayout