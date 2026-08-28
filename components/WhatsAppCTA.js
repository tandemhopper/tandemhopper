const channelUrl='https://whatsapp.com/channel/0029Vb8tvGq29756PquCbC1F'

export default function WhatsAppCTA({variant='article'}){
  if(variant==='footer'){
    return <div className="footer-whatsapp">
      <div>
        <strong>NEUE GESCHICHTEN DIREKT AUFS HANDY.</strong>
        <small>Spielberichte, Kurzmeldungen und Hopper-Tipps über unseren WhatsApp-Kanal.</small>
      </div>
      <a href={channelUrl} target="_blank" rel="noreferrer">WHATSAPP-KANAL FOLGEN →</a>
    </div>
  }

  return <aside className="article-whatsapp">
    <div>
      <strong>NICHTS NEUES VERPASSEN.</strong>
      <p>Neue Spielberichte, Kurzmeldungen und Hopper-Tipps landen auch in unserem WhatsApp-Kanal.</p>
    </div>
    <a href={channelUrl} target="_blank" rel="noreferrer">KANAL FOLGEN →</a>
  </aside>
}
