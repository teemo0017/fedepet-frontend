#!/usr/bin/env node

/**
 * Script para activar/desactivar mocks en el environment
 * Uso: node scripts/toggle-mocks.js [on|off]
 */

const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '../src/environments/environment.ts');
const arg = process.argv[2];

if (!arg || !['on', 'off'].includes(arg)) {
  console.log('❌ Uso: npm run mocks:on o npm run mocks:off');
  process.exit(1);
}

const useMocks = arg === 'on';

try {
  let content = fs.readFileSync(envPath, 'utf8');
  
  // Reemplazar el valor de useMocks
  content = content.replace(
    /useMocks:\s*(true|false)/,
    `useMocks: ${useMocks}`
  );
  
  fs.writeFileSync(envPath, content, 'utf8');
  
  const emoji = useMocks ? '🎭' : '🔌';
  const status = useMocks ? 'ACTIVADOS' : 'DESACTIVADOS';
  const message = useMocks 
    ? 'Ahora usarás datos mock (no necesitas backend)'
    : 'Ahora usarás el backend real en localhost:4000';
  
  console.log(`\n${emoji} Mocks ${status}`);
  console.log(`✅ ${message}\n`);
  
} catch (error) {
  console.error('❌ Error al modificar environment.ts:', error.message);
  process.exit(1);
}
