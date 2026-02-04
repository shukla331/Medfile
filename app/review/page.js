const queueItems = [
  {
    id: 'RX-23019',
    pharmacy: 'Sai Krishna Medicals',
    issues: 3,
    issueType: 'drug',
    sla: '00:12:18',
    status: 'new',
    priority: 'critical',
  },
  {
    id: 'RX-23020',
    pharmacy: 'MedPlus Central',
    issues: 1,
    issueType: 'dosage',
    sla: '00:28:41',
    status: 'in-review',
    priority: 'warning',
  },
  {
    id: 'RX-23021',
    pharmacy: 'Apollo Rapid',
    issues: 2,
    issueType: 'substitution',
    sla: '00:47:02',
    status: 'blocked',
    priority: 'critical',
  },
]

const priorityClass = (priority) => {
  if (priority === 'critical') {
    return 'pill pill-critical'
  }
  if (priority === 'warning') {
    return 'pill pill-warning'
  }
  return 'pill pill-neutral'
}

export default function ReviewQueuePage() {
  return (
    <section className="card">
      <h1>Review Queue</h1>
      <p className="muted">Sort by SLA breach risk. Open prescriptions in under 5 seconds.</p>
      <table className="queue-table">
        <thead>
          <tr>
            <th>Prescription ID</th>
            <th>Pharmacy Name</th>
            <th># Issues</th>
            <th>Issue Type</th>
            <th>SLA Timer</th>
            <th>Status</th>
            <th>Priority</th>
          </tr>
        </thead>
        <tbody>
          {queueItems.map((item) => (
            <tr key={item.id}>
              <td>
                <a href={`/review/${item.id}`}>{item.id}</a>
              </td>
              <td>{item.pharmacy}</td>
              <td>{item.issues}</td>
              <td>{item.issueType}</td>
              <td>{item.sla}</td>
              <td>{item.status}</td>
              <td>
                <span className={priorityClass(item.priority)}>{item.priority}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
