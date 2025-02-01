import { IncomingMessage, ServerResponse } from 'http';
import { PythonShell } from 'python-shell';

export default function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method === 'POST') {
    let body: string = '';  // Define body as a string type

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        // Parse the input data
        const inputData = JSON.parse(body);

        // Ensure the inputData has the expected structure
        if (!inputData) {
          throw new Error('Invalid data structure');
        }

        // Call the Python script to make a prediction
        PythonShell.run('predict.py', { args: [JSON.stringify(inputData)] }, (err, result) => {
                        if (err) {
                          console.error('Error in prediction:', err);
                          res.statusCode = 500;
                          res.end(JSON.stringify({ message: 'Internal Server Error' }));
                        } else {
                          // Send back the prediction result
                          res.statusCode = 200;
                          res.end(JSON.stringify({ prediction: result }));
                        }
                      });
      } catch (err) {
        console.error('Error parsing request:', err);
        res.statusCode = 400;
        res.end(JSON.stringify({ message: 'Bad Request' }));
      }
    });
  } else {
    res.statusCode = 405;
    res.end(JSON.stringify({ message: 'Method Not Allowed' }));
  }
}
