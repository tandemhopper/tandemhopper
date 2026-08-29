import Link from 'next/link'
import WhatsAppCTA from './WhatsAppCTA'

export default function Footer(){
 const year=new Date().getFullYear()
 return <footer className="site-footer simple-footer">
  <WhatsAppCTA variant="footer"/>
  <div className="footer-meta"><span>© {year} TANDEMHOPPER</span><div><Link href="/datenschutz">Datenschutz</Link><a href="https://www.instagram.com/tandemhopper/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/dietandemhopper/" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.youtube.com/@tandemhopper" target="_blank" rel="noreferrer">YouTube</a><a href="https://whatsapp.com/channel/0029Vb8tvGq29756PquCbC1F" target="_blank" rel="noreferrer">WhatsApp</a></div></div>
 </footer>
}
