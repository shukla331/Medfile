const quickLinks = [
  {
    title: 'Review Queue',
    description: 'Prioritize prescriptions that need human review.',
    href: '/review',
  },
  {
    title: 'Review Workspace',
    description: 'Inspect and resolve one prescription with confidence.',
    href: '/review/RX-23019',
  },
]

export default function HomePage() {
  return (
    <section className="card">
      <h1>HITL Review Screens</h1>
      <p className="muted">
        These screens reflect the HITL UX specification for pharmacy-ready prescription review.
      </p>
      <div className="section-title">Quick Links</div>
      <div className="action-list">
        {quickLinks.map((link) => (
          <a key={link.title} className="action-button" href={link.href}>
            <div>{link.title}</div>
            <div className="muted">{link.description}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
