import { IncomingMessage, ServerResponse } from 'http';
import { PythonShell } from 'python-shell';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'POST') {
    let body: any = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        // Parse the input data
        const inputData = JSON.parse(body);
        
        // Call the Python script to make a prediction
        PythonShell.run('predict.py', { args: [JSON.stringify(inputData)] }, (err, result) => {
          if (err) {
            console.error('Error in prediction:', err);
            res.status(500).json({ message: 'Internal Server Error' });
          } else {
            // Send back the prediction result
            res.status(200).json({ prediction: result });
          }
        });
      } catch (err) {
        console.error('Error parsing request:', err);
        res.status(400).json({ message: 'Bad Request' });
      }
    });
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
