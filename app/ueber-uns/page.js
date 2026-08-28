import Header from '../../components/Header';import Footer from '../../components/Footer';
export const metadata={
  title:'Über uns',
  description:'Tandemhopper steht für Groundhopping, Stadien, Fanszenen, Fankultur und Fußballreisen mit Blick auf die Geschichten neben dem Platz.',
  alternates:{canonical:'/ueber-uns'},
  openGraph:{
    type:'website',
    locale:'de_DE',
    url:'/ueber-uns',
    siteName:'Tandemhopper',
    title:'Über uns | Tandemhopper',
    description:'Groundhopping, Stadien, Fanszenen, Fankultur und Fußballreisen – mit Blick auf die Geschichten neben dem Platz.',
    images:[{url:'/assets/grounds-oldschool.jpg',alt:'Alter Fußballplatz und Zuschauer'}],
  },
  twitter:{
    card:'summary_large_image',
    title:'Über uns | Tandemhopper',
    description:'Groundhopping, Stadien, Fanszenen, Fankultur und Fußballreisen.',
    images:['/assets/grounds-oldschool.jpg'],
  },
};
export default function About(){return <><Header/><main className="about"><section><div><p className="eyebrow">ÜBER TANDEMHOPPER</p><h1>GEHT’S RAUS,<br/>SCHAUT’S FUSSBALL.</h1><p>Grounds sammeln. Hinschauen, was rundherum passiert. Geschichten erzählen.</p></div><img src="/assets/grounds-oldschool.jpg" alt="Zuschauer an einem alten Fußballplatz"/></section><div className="about-copy"><p>Tandemhopper beschäftigt sich mit Groundhopping, Stadien, Fanszenen, Fankultur und Reisen rund um Fußball. Im Mittelpunkt stehen nicht nur die 90 Minuten, sondern die kleinen Geschichten daneben.</p><div className="values"><div><span>01</span><h2>TIEFER BLICK.</h2><p>Mehr als Ergebnis und Tabelle.</p></div><div><span>02</span><h2>KLEINE STORYS.</h2><p>Die Dinge erzählen, die sonst am Rand liegen.</p></div><div><span>03</span><h2>NEUE PERSPEKTIVEN.</h2><p>Andere Orte, andere Menschen, mehr Fußball.</p></div></div></div></main><Footer/></>}
