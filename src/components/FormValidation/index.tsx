import React, { useState } from "react";

export default function FormValidation() {
  const [form, setForm] = useState({ email: "", name: "" });
  const [errors, setErrors] = useState<{ email?: string; name?: string }>({});

  function validate() {
    const e: { email?: string; name?: string } = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!/^\S+@\S+\.\S+$/.test(form.email)) e.email = "Invalid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      alert("Submitted: " + JSON.stringify(form));
    }
  }

  return (
    <div style={{ padding: 16 }}>
      <h3>Form with Validation</h3>
      <form onSubmit={submit} noValidate>
        <div>
          <label>Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          />
          {errors.name && <div style={{ color: "red" }}>{errors.name}</div>}
        </div>
        <div>
          <label>Email</label>
          <input
            value={form.email}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
          />
          {errors.email && <div style={{ color: "red" }}>{errors.email}</div>}
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
