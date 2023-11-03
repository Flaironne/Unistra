import { spawn } from 'child_process';

// à retirer le mail dans la base de donnée
const args = ['mail.py', 'hayk.zrk@icloud.com'];
const pythonProcess = spawn('python', args);

pythonProcess.stdout.on('data', (data) => {
  console.log(data.toString());
});

pythonProcess.stderr.on('data', (data) => {
  console.error(data.toString());
});

pythonProcess.on('close', (code) => {
  console.log(`Le processus Python s'est terminé avec le code ${code}`);
});