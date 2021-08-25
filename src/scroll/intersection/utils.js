const marginRE = /^-?\d*\.?\d+(px|%)$/;
export function parseRootMargin(rootMargin) {
  const marginString = rootMargin ? rootMargin.trim() : '0px';
  const result = marginString.split(/\s+/).map(margin => {
    if (!marginRE.test(margin)) {
      throw new Error(
        'rootMargin must be a string literal containing pixels and/or percent values',
      );
    }
    return margin;
  });
  const m0 = result.shift();
  const [m1 = m0, m2 = m0, m3 = m1] = result;
  return `${m0} ${m1} ${m2} ${m3}`;
}
export function shallowCompare(next, prev) {
  if (Array.isArray(next) && Array.isArray(prev)) {
    if (next.length === prev.length) {
      return next.some((_, index) => shallowCompare(next[index], prev[index]));
    }
  }
  return next !== prev;
}
export const { hasOwnProperty, toString } = Object.prototype;
export function isChildrenWithRef(children) {
  return children && hasOwnProperty.call(children, 'ref');
}
export function thresholdCacheKey(threshold) {
  if (!threshold || typeof threshold === 'number') {
    return threshold;
  }
  return threshold.join(',');
}
