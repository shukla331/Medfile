const rawFields = [
  { label: 'Drug name', value: 'Met XL', confidence: 0.62 },
  { label: 'Strength', value: '500 mg', confidence: 0.58 },
  { label: 'Dosage form', value: 'Tablet', confidence: 0.92 },
  { label: 'Frequency', value: 'BD', confidence: 0.66 },
  { label: 'Duration', value: '10 days', confidence: 0.71 },
]

const normalizedFields = [
  { label: 'Drug', value: 'Metformin ER', confidence: 0.68 },
  { label: 'Strength', value: '500 mg', confidence: 0.58 },
  { label: 'Frequency', value: '2/day', confidence: 0.66 },
  { label: 'Duration', value: '10 days', confidence: 0.71 },
  { label: 'Billing quantity', value: '20 tablets', confidence: 0.69 },
]

const actions = [
  { title: 'Approve field group', detail: 'Accept high-confidence fields', primary: false },
  { title: 'Edit normalized values', detail: 'Resolve low-confidence extraction', primary: false },
  { title: 'Choose substitution', detail: 'Select inventory-safe SKU', primary: false },
  { title: 'Mark as unreadable', detail: 'Escalate to manual intake', primary: false },
  { title: 'Approve & Generate Output', detail: 'Lock version and emit billing JSON', primary: true },
]

const confidenceBadge = (confidence) => {
  if (confidence >= 0.85) {
    return 'pill pill-neutral'
  }
  if (confidence >= 0.7) {
    return 'pill pill-warning'
  }
  return 'pill pill-critical'
}

export default async function ReviewWorkspacePage({ params }) {
  const resolvedParams = await params
  return (
    <div>
      <section className="card">
        <h1>Review Workspace</h1>
        <div className="muted">Prescription ID: {resolvedParams.id}</div>
        <div className="section-title">Flags</div>
        <div className="action-list">
          <span className="badge">Schedule H/X check required</span>
          <span className="badge">2 fields below confidence threshold</span>
          <span className="badge">Multiple SKUs match</span>
        </div>
      </section>

      <div className="panel-grid">
        <div className="panel">
          <h3>Raw Input</h3>
          <div className="card">
            <div className="section-title">Prescription Image</div>
            <div className="muted">Zoom • Rotate • Highlighted bounding boxes</div>
            <div className="section-title">Extracted Fields</div>
            {rawFields.map((field) => (
              <div key={field.label} className="field-row">
                <div className="field-label">{field.label}</div>
                <div className="field-value">{field.value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel">
          <h3>Extracted Structure</h3>
          <div className="section-title">Normalized Values</div>
          {normalizedFields.map((field) => (
            <div key={field.label} className="field-row">
              <div>
                <div className="field-label">{field.label}</div>
                <div className="muted">Confidence {Math.round(field.confidence * 100)}%</div>
              </div>
              <div className="field-value">{field.value}</div>
            </div>
          ))}
          <div className="section-title">Auto-expanded low confidence</div>
          {normalizedFields.map((field) => (
            <div key={`${field.label}-confidence`} className="field-row">
              <div className="field-label">{field.label}</div>
              <span className={confidenceBadge(field.confidence)}>
                {Math.round(field.confidence * 100)}%
              </span>
            </div>
          ))}
        </div>

        <div className="panel">
          <h3>Actions</h3>
          <div className="action-list">
            {actions.map((action) => (
              <button
                key={action.title}
                className={`action-button${action.primary ? ' primary' : ''}`}
                type="button"
              >
                <div>{action.title}</div>
                <div className="muted">{action.detail}</div>
              </button>
            ))}
          </div>
          <div className="section-title">Audit trail</div>
          <div className="muted">
            Reviewer edits are recorded with timestamp, old value, new value, and reason code.
          </div>
        </div>
      </div>
    </div>
  )
}
