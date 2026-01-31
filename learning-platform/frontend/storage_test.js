// Test localStorage access
console.log('=== Browser Storage Test ===');
console.log('localStorage available:', typeof localStorage !== 'undefined');
console.log('access_token in localStorage:', localStorage.getItem('access_token'));
console.log('All localStorage items:');
for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  console.log(`${key}: ${localStorage.getItem(key)}`);
}