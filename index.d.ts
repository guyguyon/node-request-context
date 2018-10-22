import { HookCallbacks } from "async_hooks";

interface Namespace {
    run(fn: () => void): void;
    get(key: string): any;
    set(key: string, value: any): void;
}

export function createNamespace(name: string): Namespace;
export function getNamespace(name: string): Namespace;
