export function defuse(promise: Promise<any>) {
  promise.catch(() => {});
  return promise;
}