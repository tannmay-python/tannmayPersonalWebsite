import data from '../data.json'

export default function Footer() {
  const { links } = data.profile
  return (
    <footer className="footer">
      <span className="fname">Tannmay Kumarr Baid</span>
      <span>
        <a href={`mailto:${links.email}`}>Email</a> · {' '}
        <a href={links.twitter} target="_blank" rel="noreferrer">Twitter</a> · {' '}
        <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
      </span>
      <span>© {new Date().getFullYear()}</span>
    </footer>
  )
}
