import { FilterKeysByPrefix, GetNestedValue, IdKey, OmitKeysByPrefix } from "../types/types";

export function filterKeysByPrefix<T extends Record<string, any>>(
  obj: T,
  prefix: string
): FilterKeysByPrefix<T, typeof prefix> {
  const result: any = {};
  
  for (const key in obj) {
    if (key.startsWith(prefix)) {
      result[key] = obj[key];
    }
  }
  
  return result;
}

export function omitKeysByPrefix<T extends Record<string, any>>(
  obj: T,
  prefix: string
): OmitKeysByPrefix<T, typeof prefix> {
  const result: any = {};
  
  for (const key in obj) {
    if (!key.startsWith(prefix)) {
      result[key] = obj[key];
    }
  }
  
  return result;
}

export function getNestedValue<
  T extends Record<string, any>,
  K extends string
>(
  obj: T,
  key: K,
  config?: {
    leafValue?: unknown;
    branchValue?: Record<string, any>;
  }
): GetNestedValue<T, K, typeof config extends { leafValue: infer L } ? L : unknown, typeof config extends { branchValue: infer B } ? B : Record<string, any>> | undefined {
  
  if(!obj || typeof obj !== 'object') return obj;

  const search = (current: any, depth: number = 0): any => {
    if (!current || typeof current !== 'object') return undefined;
    
    if (key in current) {
      const value = current[key];
      const { leafValue, branchValue } = config || {};
      
      const isValidLeaf = leafValue === undefined || value === leafValue;
      const isValidBranch = branchValue === undefined || 
        (typeof branchValue === 'object' && value && typeof value === 'object');
      
      if (isValidLeaf || isValidBranch) {
        return value;
      }
      return undefined;
    }
    
    for (const prop in current) {
      const value = current[prop];
      if (value && typeof value === 'object') {
        const result = search(value, depth + 1);
        if (result !== undefined) return result;
      }
    }
    
    return undefined;
  };
  
  return search(obj);
}

export function idKey<T extends string>(str: T): IdKey<T> {
  const hyphenIndex = str.indexOf('-');
  
  if (hyphenIndex !== -1) {
    return str.substring(0, hyphenIndex) as IdKey<T>;
  }
  
  return str as IdKey<T>;
}