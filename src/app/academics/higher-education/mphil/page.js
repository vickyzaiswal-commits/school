import Link from 'next/link'

export default function MPhilPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">MPhil</h1>
        <p className="text-lg text-gray-700 mb-6">The MPhil is a research-focused postgraduate program intended to develop advanced research skills and prepare students for doctoral study.</p>
      </section>

      <section className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-3">Program Overview</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>Advanced seminars and supervised research project.</li>
          <li>Training in research methodology and scholarly communication.</li>
          <li>Opportunity to progress to a PhD program.</li>
        </ul>
      </section>
    </main>
  )
}
