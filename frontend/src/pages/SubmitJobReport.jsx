import React, { useState } from 'react';

const SubmitJobReport = () => {
  const [form, setForm] = useState({
    title: '',
    company: '',
    link: '',
    description: ''
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) return alert("Login required.");

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('company', form.company);
      formData.append('link', form.link);
      formData.append('description', form.description);
      if (image) formData.append('image', image);

      const res = await fetch('http://localhost:5000/api/jobs/submit', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error('Submission error:', err);
      alert('Failed to submit report.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="submit-page">
      <div className="submit-container">
        <h1 className="submit-title">Suspicious Job checker</h1>

        <form onSubmit={handleSubmit} className="submit-form">
          <input
            name="title"
            placeholder="Job Title *"
            value={form.title}
            onChange={handleChange}
            className="form-input"
            required
          />

          <input
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            className="form-input"
          />

          <input
            name="link"
            placeholder="Job Link (optional)"
            value={form.link}
            onChange={handleChange}
            className="form-input"
          />

          <textarea
            name="description"
            placeholder="Paste the job description here..."
            rows="6"
            value={form.description}
            onChange={handleChange}
            className="form-textarea"
          ></textarea>

          <div className="image-upload">
            <label>📎 Upload Screenshot (optional)</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {preview && <img src={preview} alt="preview" className="preview-image" />}
          </div>

          <button
            type="submit"
            className={`submit-button ${loading ? 'loading' : ''}`}
            disabled={loading}
          >
            {loading ? <span>Submitting...</span> : 'Analyze & Submit'}
          </button>
        </form>

        {result && (
          <div className="result-card">
            <h2>🤖 AI Scam Analysis</h2>
            <p><strong>Scam Score:</strong> {result.scamScore}/100</p>
            <p>
              <strong>Verdict:</strong>{' '}
              <span className={
                result.scamScore > 75 ? 'verdict danger' :
                result.scamScore > 50 ? 'verdict warning' :
                'verdict safe'
              }>
                {result.scamScore > 75 ? '🚫 Likely Scam' :
                result.scamScore > 50 ? '⚠️ Suspicious' : '✅ Likely Legit'}
              </span>
            </p>

            <ul>
              {result.scamReasons?.map((reason, idx) => (
                <li key={idx}>• {reason}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SubmitJobReport;
