export function createSubscribable<T>() {
  const subscribers: Set<(value: T) => void> = new Set();

  return {
    add(cb: (value: T) => void): () => void {
      subscribers.add(cb);

      return () => {
        subscribers.delete(cb);
      };
    },

    call(value: T): void {
      subscribers.forEach((cb) => cb(value));
    },
  };
}

class Subscribable<T> {
  #subscribers: Set<(value: T) => void> = new Set();

  add(cb: (value: T) => void): () => void {
    this.#subscribers.add(cb);

    return () => {
      this.#subscribers.delete(cb);
    };
  }

  call(value: T): void {
    this.#subscribers.forEach((cb) => cb(value));
  }
}

export default Subscribable;
