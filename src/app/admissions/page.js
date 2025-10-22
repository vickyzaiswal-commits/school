"use client";
import React, { useState } from "react";
import { Edit, Send, X } from "lucide-react";
import FileUpload from '@/utils/fileUpload';

const AdmissionsPage = () => {
  const [editMode] = useState(true); // assume admin for now
  const [editOpen, setEditOpen] = useState(false);
  const [data, setData] = useState({
    hero: {
      title: "Admissions",
      subtitle: "Join our school community — apply now.",
      cta: { text: "Apply for Admission", href: "/apply-admission", show: true },
      show: true
    },
    description: "We welcome applications for all grades. Learn about eligibility, fees, and the admission process.",
    quickActions: [
      { label: "Apply for Admission", link: "/apply-admission", show: true },
      { label: "Download Prospectus", link: "/downloads", show: true }
    ]
  });

  const [form, setForm] = useState(data);

  const openEdit = () => {
    setForm(data);
    setEditOpen(true);
  };
  const save = () => {
    setData(form);
    setEditOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <section className="py-16 bg-green-800 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">{data.hero.title}</h1>
          <p className="text-lg mb-6">{data.hero.subtitle}</p>
          {data.hero.cta?.show && (
            <a href={data.hero.cta.href} className="inline-flex items-center bg-white text-green-800 px-6 py-3 rounded-lg font-semibold">
              {data.hero.cta.text}
            </a>
          )}
        </div>
        {editMode && (
          <button onClick={openEdit} className="absolute top-6 right-6 bg-white/80 text-green-800 p-2 rounded-full">
            <Edit className="h-5 w-5" />
          </button>
        )}
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-700">{data.description}</p>
        </div>
      </section>

      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {data.quickActions.filter(a => a.show).map((a, i) => (
              <a key={i} href={a.link} className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold min-w-[160px]">
                {a.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {editOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Edit Admissions</h2>
              <button onClick={() => setEditOpen(false)} className="p-2 text-gray-600"><X /></button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Hero Title</label>
                <input type="text" value={form.hero.title} onChange={e => setForm({...form, hero: {...form.hero, title: e.target.value}})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">Hero Subtitle</label>
                <textarea value={form.hero.subtitle} onChange={e => setForm({...form, hero: {...form.hero, subtitle: e.target.value}})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Text</label>
                <input type="text" value={form.hero.cta.text} onChange={e => setForm({...form, hero: {...form.hero, cta: {...form.hero.cta, text: e.target.value}}})} className="w-full p-2 border rounded" />
              </div>
              <div>
                <label className="block text-sm font-medium">CTA Link (or upload prospectus)</label>
                <input type="text" value={form.hero.cta.href} onChange={e => setForm({...form, hero: {...form.hero, cta: {...form.hero.cta, href: e.target.value}}})} className="w-full p-2 border rounded mb-2" />
                <FileUpload
                  currentUrl={form.hero.cta.href}
                  onUploadSuccess={(url) => setForm({...form, hero: {...form.hero, cta: {...form.hero.cta, href: url}}})}
                  label="Upload Prospectus (PDF/DOC)"
                  isDocument={true}
                  accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                  uploadPreset="Upload_file"
                  folder="admissions"
                />
              </div>

              <h3 className="font-semibold">Quick Actions</h3>
              {form.quickActions.map((q, idx) => (
                <div key={idx} className="grid grid-cols-3 gap-2 items-center">
                  <input type="text" value={q.label} onChange={e => {
                    const qa = [...form.quickActions]; qa[idx] = {...qa[idx], label: e.target.value}; setForm({...form, quickActions: qa});
                  }} className="col-span-2 p-2 border rounded" />
                  <input type="text" value={q.link} onChange={e => {
                    const qa = [...form.quickActions]; qa[idx] = {...qa[idx], link: e.target.value}; setForm({...form, quickActions: qa});
                  }} className="p-2 border rounded" />
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-end space-x-2">
              <button onClick={() => setEditOpen(false)} className="px-3 py-2 bg-white border rounded">Cancel</button>
              <button onClick={save} className="px-3 py-2 bg-green-600 text-white rounded flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Save</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdmissionsPage;
