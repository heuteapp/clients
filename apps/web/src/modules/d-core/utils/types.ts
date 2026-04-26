
export function getNestedValue(obj: any, key: string): any {
  if (!obj || typeof obj !== 'object') return undefined;

  if (key.includes('root')) {
    return obj;
  }

  // Direkt key varsa döndür
  if (key in obj) return obj[key];
  
  // Nested objelerde ara
  for (const prop in obj) {
    const value = obj[prop];
    if (value && typeof value === 'object') {
      const result = getNestedValue(value, key);
      if (result !== undefined) return result;
    }
  }
  
  return undefined;
}