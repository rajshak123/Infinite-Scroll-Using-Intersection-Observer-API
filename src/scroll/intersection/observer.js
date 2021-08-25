/* eslint-disable no-void */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-cond-assign */
import { parseRootMargin, shallowCompare } from './utils';
export const observerElementsMap = new Map();
export function getPooled(options = {}) {
  const root = options.root || null;
  const rootMargin = parseRootMargin(options.rootMargin);
  const threshold = Array.isArray(options.threshold)
    ? options.threshold
    : [options.threshold != null ? options.threshold : 0];
  const observers = observerElementsMap.keys();
  let observer;
  while ((observer = observers.next().value)) {
    const unmatched =
      root !== observer.root ||
      rootMargin !== observer.rootMargin ||
      shallowCompare(threshold, observer.thresholds);
    if (!unmatched) {
      return observer;
    }
  }
  return null;
}
export function findObserverElement(observer, entry) {
  const elements = observerElementsMap.get(observer);
  if (elements) {
    const values = elements.values();
    let element;
    while ((element = values.next().value)) {
      if (element.target === entry.target) {
        return element;
      }
    }
  }
  return null;
}
/**
 * The Intersection Observer API callback that is called whenever one element
 * – namely the target – intersects either the device viewport or a specified element.
 * Also will get called whenever the visibility of the target element changes and
 * crosses desired amounts of intersection with the root.
 */
export function callback(entries, observer) {
  for (let i = 0; i < entries.length; i += 1) {
    const element = findObserverElement(observer, entries[i]);
    /* istanbul ignore next line */
    if (element) {
      element.handleChange(entries[i]);
    }
  }
}
export function createObserver(options) {
  const pooled = getPooled(options);
  if (pooled) {
    return pooled;
  }
  const observer = new IntersectionObserver(callback, options);
  observerElementsMap.set(observer, new Set());
  return observer;
}
export function observeElement(element) {
  let a;
  if (element.observer && !observerElementsMap.has(element.observer)) {
    observerElementsMap.set(element.observer, new Set());
  }
  (a = observerElementsMap.get(element.observer)) === null || a === void 0
    ? void 0
    : a.add(element);
  element.observer.observe(element.target);
}
export function unobserveElement(element, target) {
  if (observerElementsMap.has(element.observer)) {
    const targets = observerElementsMap.get(element.observer);
    if (
      targets === null || targets === void 0 ? void 0 : targets.delete(element)
    ) {
      if (targets.size > 0) {
        element.observer.unobserve(target);
      } else {
        element.observer.disconnect();
        observerElementsMap.delete(element.observer);
      }
    }
  }
}
