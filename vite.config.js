import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'razorpay-order-api',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === '/api/create-order' && req.method === 'POST') {
              let body = '';
              req.on('data', chunk => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body || '{}');
                  const amount = data.amount;
                  if (!amount) {
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Amount is required' }));
                    return;
                  }

                  const keyId = env.VITE_RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID;
                  const keySecret = env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_KEY_SECRET;

                  if (!keyId || !keySecret) {
                    // Fallback to mock order for testing/demo without credentials
                    res.writeHead(200, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({
                      id: `order_mock_${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
                      amount: Math.round(amount * 100),
                      currency: 'INR',
                      mock: true
                    }));
                    return;
                  }

                  const response = await fetch('https://api.razorpay.com/v1/orders', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'Authorization': 'Basic ' + btoa(`${keyId}:${keySecret}`)
                    },
                    body: JSON.stringify({
                      amount: Math.round(amount * 100), // Razorpay expects amount in paise
                      currency: 'INR',
                      receipt: `rcpt_${Math.random().toString(36).substring(2, 10).toUpperCase()}`
                    })
                  });

                  if (!response.ok) {
                    const errData = await response.json();
                    throw new Error(errData.error?.description || 'Razorpay API error');
                  }

                  const order = await response.json();
                  res.writeHead(200, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify(order));
                } catch (error) {
                  console.error('Error creating Razorpay order:', error);
                  res.writeHead(500, { 'Content-Type': 'application/json' });
                  res.end(JSON.stringify({ error: error.message }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ]
  };
})
