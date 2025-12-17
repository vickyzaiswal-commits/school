import Link from 'next/link'

export default function PhDPage() {
  return (
    <main className="container mx-auto px-4 py-12">
      <section className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-4">PhD</h1>
        <p className="text-lg text-gray-700 mb-6">Our PhD programs support independent research across disciplines, guided by experienced supervisors and supported by research infrastructure and funding opportunities.</p>
      </section>

      <section className="max-w-3xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-3">Research Support</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-800">
          <li>Supervision by faculty with active research portfolios.</li>
          <li>Access to labs, libraries and research grants.</li>
          <li>Opportunities for publication and conference participation.</li>
        </ul>
      </section>
    </main>
  )
}
