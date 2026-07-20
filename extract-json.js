const fs = require('fs');
const path = require('path');

const fileMap = {
  'src/app/about/history/page.js': 'history.json',
  'src/app/about/vision-mission/page.js': 'vision-mission.json',
  'src/app/about/principal-message/page.js': 'principal-message.json',
  'src/app/about/infrastructure/page.js': 'infrastructure.json',
  'src/app/academics/curriculum/page.js': 'curriculum.json',
  'src/app/academics/pre-primary/page.js': 'pre-primary.json',
  'src/app/academics/primary/page.js': 'primary.json',
  'src/app/academics/middle/page.js': 'middle.json',
  'src/app/academics/senior/page.js': 'senior.json',
  'src/app/academics/higher-education/page.js': 'higher-education.json',
  'src/app/admissions/process/page.js': 'admission-process.json',
  'src/app/admissions/fees/page.js': 'admission-fees.json',
  'src/app/careers/page.js': 'careers.json',
  'src/app/alumni/page.js': 'alumni.json',
  'src/app/achievements/page.js': 'achievements.json',
  'src/app/virtual-tour/page.js': 'virtual-tour.json',
  'src/app/student-life/transport/page.js': 'transport.json',
  'src/app/student-life/timings/page.js': 'timings.json',
  'src/app/student-life/houses/page.js': 'houses.json',
  'src/app/student-life/council/page.js': 'council.json',
  'src/app/student-life/canteen/page.js': 'canteen.json',
  'src/app/student-life/calendar/page.js': 'calendar.json',
  'src/app/contact/page.js': 'contact.json',
  'src/app/notice/page.js': 'notice.json',
  'src/app/gallery/page.js': 'gallery.json',
  'src/app/downloads/syllabus/page.js': 'syllabus.json',
  'src/app/downloads/forms/page.js': 'forms.json',
  'src/app/downloads/policies/page.js': 'policies.json',
  'src/app/downloads/fee-structure/page.js': 'fee-structure.json',
  'src/app/co-curricular/arts/page.js': 'arts.json',
  'src/app/co-curricular/sports/page.js': 'sports.json',
  'src/app/co-curricular/music/page.js': 'music.json',
  'src/app/co-curricular/events/page.js': 'events.json',
  'src/app/co-curricular/competitions/page.js': 'competitions.json',
  'src/app/co-curricular/clubs/page.js': 'clubs.json',
};

const dataDir = path.join(__dirname, 'src', 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

console.log('Starting defaultData JSON extraction...');

for (const [relPath, jsonName] of Object.entries(fileMap)) {
  const fullPath = path.join(__dirname, relPath);
  if (!fs.existsSync(fullPath)) {
    console.log(`[-] File not found: ${relPath}`);
    continue;
  }

  let content = fs.readFileSync(fullPath, 'utf8');
  
  // Look for defaultData = {
  const match = content.match(/(?:const|let)?\s*defaultData\s*=\s*\{/);
  if (!match) {
    console.log(`[~] Skipping ${relPath} (already processed or no defaultData found)`);
    continue;
  }

  const startIndex = match.index;
  const braceStartIndex = content.indexOf('{', startIndex);
  
  // Find matching closing brace
  let openBraces = 0;
  let endIndex = -1;
  for (let i = braceStartIndex; i < content.length; i++) {
    if (content[i] === '{') {
      openBraces++;
    } else if (content[i] === '}') {
      openBraces--;
      if (openBraces === 0) {
        endIndex = i;
        break;
      }
    }
  }

  if (endIndex === -1) {
    console.error(`[!] Could not find matching closing brace in ${relPath}`);
    continue;
  }

  const objectText = content.substring(braceStartIndex, endIndex + 1);
  
  let obj;
  try {
    // Wrap in parentheses to evaluate as expression
    obj = eval(`(${objectText})`);
  } catch (e) {
    console.error(`[!] Evaluation failed for ${relPath}:`, e.message);
    continue;
  }

  // Write JSON
  const jsonPath = path.join(dataDir, jsonName);
  fs.writeFileSync(jsonPath, JSON.stringify(obj, null, 2), 'utf8');
  console.log(`[+] Extracted: ${jsonName}`);

  // Replace defaultData definition in JS
  let replacementEndIndex = endIndex + 1;
  // Look for a trailing semicolon
  if (content[replacementEndIndex] === ';') {
    replacementEndIndex++;
  }

  // Remove the block
  const before = content.substring(0, startIndex);
  const after = content.substring(replacementEndIndex);
  let newContent = before + after;

  // Prepend import statement after "use client";
  const importStmt = `import defaultData from '@/data/${jsonName}';\n`;
  const clientMatch = newContent.match(/"use client";|'use client';/);
  if (clientMatch) {
    const insertIndex = clientMatch.index + clientMatch[0].length;
    newContent = newContent.slice(0, insertIndex) + '\n' + importStmt + newContent.slice(insertIndex);
  } else {
    newContent = importStmt + newContent;
  }

  fs.writeFileSync(fullPath, newContent, 'utf8');
  console.log(`[+] Updated JS: ${relPath}`);
}

console.log('Extraction complete!');
