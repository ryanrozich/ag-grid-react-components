import { createCanvas } from 'canvas';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create a 1200x630 canvas (Open Graph recommended size)
const canvas = createCanvas(1200, 630);
const ctx = canvas.getContext('2d');

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
gradient.addColorStop(0, '#1e1b4b');
gradient.addColorStop(0.5, '#0f172a');
gradient.addColorStop(1, '#312e81');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, 1200, 630);

// Grid pattern
ctx.strokeStyle = 'rgba(30, 41, 59, 0.3)';
ctx.lineWidth = 1;
for (let x = 0; x <= 1200; x += 40) {
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, 630);
  ctx.stroke();
}
for (let y = 0; y <= 630; y += 40) {
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(1200, y);
  ctx.stroke();
}

// Title
ctx.font = 'bold 64px Inter, Arial, sans-serif';
ctx.fillStyle = 'white';
ctx.fillText('AG Grid React Components', 100, 150);

// Subtitle
ctx.font = '32px Inter, Arial, sans-serif';
ctx.fillStyle = '#94a3b8';
ctx.fillText('Give your users the date filtering they deserve', 100, 210);

// Feature pills
const pills = [
  { text: 'Relative Dates', color: '#4f46e5', textColor: '#818cf8', x: 100 },
  { text: 'Quick Filters', color: '#10b981', textColor: '#34d399', x: 360 },
  { text: 'URL Persistence', color: '#f59e0b', textColor: '#fbbf24', x: 620 }
];

pills.forEach(pill => {
  // Pill background
  ctx.fillStyle = pill.color + '33'; // 20% opacity
  ctx.beginPath();
  ctx.roundRect(pill.x, 260, 240, 50, 25);
  ctx.fill();

  // Pill text
  ctx.font = '20px Inter, Arial, sans-serif';
  ctx.fillStyle = pill.textColor;
  ctx.fillText(pill.text, pill.x + 30, 290);
});

// Code example background
ctx.fillStyle = 'rgba(30, 41, 59, 0.8)';
ctx.beginPath();
ctx.roundRect(100, 350, 800, 140, 8);
ctx.fill();

// Code example text
ctx.font = '18px "Fira Code", monospace';
ctx.fillStyle = '#60a5fa';
ctx.fillText('// Enable relative date queries like "Today-7d"', 120, 380);
ctx.fillStyle = '#e5e7eb';
ctx.fillText('const DateFilter = createDateFilter();', 120, 410);
ctx.fillText('filterParams: { defaultMode: \'relative\' }', 120, 440);
ctx.fillStyle = '#60a5fa';
ctx.fillText('// "Last 30 days" stays last 30 days', 120, 470);

// Bundle size badge
ctx.fillStyle = '#10b98133'; // 20% opacity
ctx.beginPath();
ctx.roundRect(950, 480, 150, 60, 8);
ctx.fill();

ctx.font = '16px Inter, Arial, sans-serif';
ctx.fillStyle = '#34d399';
ctx.textAlign = 'center';
ctx.fillText('Starting at', 1025, 505);
ctx.font = 'bold 24px Inter, Arial, sans-serif';
ctx.fillText('25KB', 1025, 530);

// Save the image
const buffer = canvas.toBuffer('image/png');
const outputPath = path.join(__dirname, '..', 'public', 'og-image.png');
fs.writeFileSync(outputPath, buffer);

console.log('Open Graph image generated successfully!');
console.log('Saved to:', outputPath);