import Link from 'next/link'

export default function Footer(){
 const year=new Date().getFullYear()
 return <footer className="site-footer simple-footer">
  <div className="footer-point"><span className="footer-icon">⌕</span><div><strong>TIEFER BLICK.</strong><small>Mehr als Ergebnis und Tabelle.</small></div></div>
  <div className="footer-point"><span className="footer-icon">▤</span><div><strong>KLEINE STORYS.</strong><small>Die Geschichten am Rand erzählen.</small></div></div>
  <div className="footer-point"><span className="footer-icon">◉</span><div><strong>NEUE PERSPEKTIVEN.</strong><small>Das Sichtfeld über 90 Minuten hinaus erweitern.</small></div></div>
  <div className="footer-meta"><span>© {year} TANDEMHOPPER</span><div><Link href="/datenschutz">Datenschutz</Link><a href="https://www.instagram.com/tandemhopper/" target="_blank" rel="noreferrer">Instagram</a><a href="https://www.facebook.com/dietandemhopper/" target="_blank" rel="noreferrer">Facebook</a><a href="https://www.youtube.com/@tandemhopper" target="_blank" rel="noreferrer">YouTube</a></div></div>
 </footer>
}
