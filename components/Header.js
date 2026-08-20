import Link from 'next/link';

const IconInstagram=()=> <svg viewBox="0 0 24 24"><rect x="3.4" y="3.4" width="17.2" height="17.2" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="12" cy="12" r="4.1" fill="none" stroke="currentColor" strokeWidth="1.8"/><circle cx="17.6" cy="6.6" r="1.15" fill="currentColor"/></svg>;
const IconFacebook=()=> <svg viewBox="0 0 24 24"><path fill="currentColor" d="M13.8 21v-8h2.8l.42-3.1H13.8V8c0-.9.25-1.5 1.58-1.5H17V3.75c-.28-.04-1.24-.12-2.36-.12-2.34 0-3.94 1.43-3.94 4.05V9.9H8.05V13h2.65v8h3.1Z"/></svg>;
const IconYoutube=()=> <svg viewBox="0 0 24 24"><path fill="currentColor" d="M21.25 7.1a3 3 0 0 0-2.1-2.12C17.3 4.5 12 4.5 12 4.5s-5.3 0-7.15.48A3 3 0 0 0 2.75 7.1 31 31 0 0 0 2.3 12a31 31 0 0 0 .45 4.9 3 3 0 0 0 2.1 2.12c1.85.48 7.15.48 7.15.48s5.3 0 7.15-.48a3 3 0 0 0 2.1-2.12A31 31 0 0 0 21.7 12a31 31 0 0 0-.45-4.9ZM10.05 15.25v-6.5L15.7 12l-5.65 3.25Z"/></svg>;

const Navigation=({className})=> <nav className={className}><Link href="/">STARTSEITE</Link><Link href="/geschichten?filter=spielbericht">SPIELBERICHTE</Link><Link href="/geschichten?filter=fankultur">FANKULTUR</Link><Link href="/geschichten?filter=grounds">GROUNDS</Link><Link href="/geschichten?filter=reisen">REISEN</Link><Link href="/ueber-uns">ÜBER UNS</Link></nav>;
const Socials=({className})=> <div className={className}><a href="https://www.instagram.com/tandemhopper/" target="_blank" rel="noreferrer" aria-label="Instagram"><IconInstagram/></a><a href="https://www.facebook.com/dietandemhopper/" target="_blank" rel="noreferrer" aria-label="Facebook"><IconFacebook/></a><a href="https://www.youtube.com/@tandemhopper" target="_blank" rel="noreferrer" aria-label="YouTube"><IconYoutube/></a></div>;

export default function Header(){
 return <header className="site-header">
  <Link className="brand" href="/"><span className="brand-mark"><img src="/tandem-logo" alt="Tandemhopper Tandem-Signet"/></span><span className="brand-copy"><strong>TANDEMHOPPER</strong><small>FUSSBALL DORT, WO’S SPANNEND WIRD.</small></span></Link>
  <Navigation className="main-nav"/>
  <Socials className="social-nav"/>
  <details className="mobile-menu">
   <summary aria-label="Menü öffnen"><span></span><span></span><span></span></summary>
   <div className="mobile-menu-panel">
    <Navigation className="mobile-nav"/>
    <Socials className="mobile-socials"/>
   </div>
  </details>
 </header>
}
