import { PlatformAdapter } from './base';
import { OpenCodeAdapter } from './opencode';
import { ClaudeCodeAdapter } from './claude-code';
import { CodexAdapter } from './codex';
import { HermesAdapter } from './hermes';

export * from './base';
export { OpenCodeAdapter } from './opencode';
export { ClaudeCodeAdapter } from './claude-code';
export { CodexAdapter } from './codex';
export { HermesAdapter } from './hermes';

export class AdapterFactory {
  private adapters: Map<string, PlatformAdapter> = new Map();

  constructor() {
    this.registerAdapter(new OpenCodeAdapter());
    this.registerAdapter(new ClaudeCodeAdapter());
    this.registerAdapter(new CodexAdapter());
    this.registerAdapter(new HermesAdapter());
  }

  registerAdapter(adapter: PlatformAdapter): void {
    this.adapters.set(adapter.name, adapter);
  }

  getAdapter(platform?: string): PlatformAdapter | null {
    if (platform) {
      return this.adapters.get(platform) || null;
    }

    for (const adapter of this.adapters.values()) {
      if (adapter.detect()) {
        return adapter;
      }
    }

    return null;
  }

  listAdapters(): string[] {
    return Array.from(this.adapters.keys());
  }

  getAdapterByName(name: string): PlatformAdapter | undefined {
    return this.adapters.get(name);
  }

  hasAdapter(name: string): boolean {
    return this.adapters.has(name);
  }
}

export const adapterFactory = new AdapterFactory();