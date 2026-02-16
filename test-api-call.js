const fetch = globalThis.fetch;

async function run() {
    try {
        console.log('Testing against port 3002...');
        const res = await fetch('http://localhost:3002/api/data', {
            method: 'POST',
            body: JSON.stringify({ action: "get_all_homes" }),
            headers: { 'Content-Type': 'application/json' }
        });

        console.log('Status:', res.status);
        if (res.ok) {
            const data = await res.json();
            console.log('Body:', JSON.stringify(data, null, 2));
        } else {
            const txt = await res.text();
            console.log('Error Body:', txt);
        }

    } catch (err) {
        console.error('Fetch error:', err);
    }
}

run();
