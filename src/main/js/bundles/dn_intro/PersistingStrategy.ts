/**
 * This interface abstracts the strategy for persisting the current step of the tour.
 * This might be saving to a local variable, a cookie, session storage, or local storage.
 */
export interface PersistingStrategy {
    save(index: number): void;
    restore(): number;
    clear(): void;
}

export class LocalVariablePersistingStrategy implements PersistingStrategy {
    private value = -1;

    save(index: number): void {
        this.value = index;
    }

    restore(): number {
        return this.value;
    }

    clear(): void {
        this.value = -1;
    }
}
