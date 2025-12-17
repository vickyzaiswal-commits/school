import Link from 'next/link'

export default function Page() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Bachelor’s Degree</h1>
        <p className="text-lg text-gray-700 mb-6">Our Bachelor's programs provide a strong foundation in academics, practical experience, and opportunities for research and internships to prepare students for careers or higher studies.</p>
      </section>

      <section className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-3">Programs Offered</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li><strong>B.A. (Bachelor of Arts)</strong> — Humanities and Social Sciences</li>
          <li><strong>B.Sc. (Bachelor of Science)</strong> — Sciences and Mathematics</li>
          <li><strong>B.Com. (Bachelor of Commerce)</strong> — Commerce and Finance</li>
        </ul>
      </section>

      <section className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-3">Curriculum Highlights</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>Comprehensive core courses with a choice of electives.</li>
          <li>Project-based assessments and a capstone research project.</li>
          <li>Industry seminars, workshops and internship opportunities.</li>
        </ul>
      </section>

      <section className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-3">Admissions & Eligibility</h2>
        <p className="mb-4 text-gray-700">Eligibility criteria, application deadlines, and fee details are available on our admissions pages. Please review the specific program requirements carefully.</p>
        <div className="flex items-center gap-3">
          <Link href="/admissions/process" className="inline-block bg-blue-600 text-white px-4 py-2 rounded">Admissions Process</Link>
          <Link href="/downloads/forms" className="inline-block bg-gray-100 text-gray-800 px-4 py-2 rounded">Download Forms</Link>
        </div>
      </section>

      <section className="max-w-3xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
        <p className="text-gray-700">For program-specific queries, contact the Academic Office or visit our contact page for phone and email details.</p>
        <div className="mt-4">
          <Link href="/contact" className="text-blue-600 underline">Visit Contact Page</Link>
        </div>
      </section>
    </main>
  )
}
