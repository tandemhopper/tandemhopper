import Link from 'next/link'

export default function Footer(){
 const year=new Date().getFullYear()
 return <footer className="site-footer editorial-footer">
  <div className="footer-main">
    <div className="footer-brand">
      <span className="footer-brand-mark"><img src="/tandem-logo" alt=""/></span>
      <div><strong>TANDEMHOPPER</strong><p>Geht’s raus, schaut’s Fußball.</p></div>
    </div>
    <div className="footer-nav-group"><span>LESEN</span><nav><Link href="/geschichten?filter=spielbericht">Spielberichte</Link><Link href="/geschichten?filter=fankultur">Fankultur</Link><Link href="/geschichten?filter=grounds">Grounds</Link><Link href="/geschichten?filter=reisen">Reisen</Link></nav></div>
    <div className="footer-nav-group"><span>TANDEMHOPPER</span><nav><Link href="/geschichten">Alle Geschichten</Link><Link href="/ueber-uns">Über uns</Link></nav></div>
    <div className="footer-social-group"><span>FOLGEN</span><div><a href="https://www.instagram.com/tandemhopper/" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://www.facebook.com/dietandemhopper/" target="_blank" rel="noreferrer">Facebook ↗</a><a href="https://www.youtube.com/@tandemhopper" target="_blank" rel="noreferrer">YouTube ↗</a></div></div>
  </div>
  <div className="footer-bottom"><span>© {year} TANDEMHOPPER</span><span>GROUNDS · FANKULTUR · REISEN</span></div>
 </footer>
}
