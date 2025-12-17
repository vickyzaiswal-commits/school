import Link from 'next/link'

export default function MastersPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">Master’s Degree</h1>
        <p className="text-lg text-gray-700 mb-6">Our Master's programs combine advanced coursework with research and practical training to prepare students for leadership roles and further study.</p>
      </section>

      <section className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-3">Key Features</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>Specialized streams and elective choices.</li>
          <li>Research projects and thesis options.</li>
          <li>Collaborations with industry and research centres.</li>
        </ul>
      </section>

      <section className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-3">Admissions</h2>
        <p className="text-gray-700">Admissions are based on undergraduate performance, entrance exams (where applicable), and interviews. See the admissions page for details.</p>
        <div className="mt-4">
          <Link href="/admissions/process" className="text-blue-600 underline">Admissions Process</Link>
        </div>
      </section>
    </main>
  )
}
