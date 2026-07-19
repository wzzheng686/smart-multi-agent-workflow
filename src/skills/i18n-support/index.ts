import * as fs from 'fs';
import * as path from 'path';

export interface I18nOptions {
  defaultLocale?: string;
  fallbackLocale?: string;
  localesDir?: string;
}

export interface MessageParams {
  [key: string]: string | number;
}

export class I18nManager {
  private defaultLocale: string;
  private fallbackLocale: string;
  private localesDir: string;
  private cache: Map<string, Record<string, unknown>> = new Map();

  constructor(options: I18nOptions = {}) {
    this.defaultLocale = options.defaultLocale || 'en';
    this.fallbackLocale = options.fallbackLocale || 'en';
    this.localesDir = options.localesDir || path.join(__dirname, 'locales');
  }

  detectLanguage(): string {
    // Check environment variables
    if (process.env.LANG?.startsWith('zh')) return 'zh-CN';
    if (process.env.LANGUAGE?.startsWith('zh')) return 'zh-CN';
    
    // Check platform-specific settings
    if (process.env.OPENCODE_LANG) return process.env.OPENCODE_LANG;
    
    // Default to English
    return this.defaultLocale;
  }

  getAvailableLanguages(): string[] {
    try {
      const files = fs.readdirSync(this.localesDir);
      return files
        .filter(file => file.endsWith('.json'))
        .map(file => file.replace('.json', ''));
    } catch {
      return [this.defaultLocale];
    }
  }

  private loadLocale(locale: string): Record<string, unknown> {
    if (this.cache.has(locale)) {
      return this.cache.get(locale)!;
    }

    const localePath = path.join(this.localesDir, `${locale}.json`);
    
    try {
      const content = fs.readFileSync(localePath, 'utf-8');
      const data = JSON.parse(content);
      this.cache.set(locale, data);
      return data;
    } catch {
      // Try fallback locale
      if (locale !== this.fallbackLocale) {
        return this.loadLocale(this.fallbackLocale);
      }
      throw new Error(`Failed to load locale: ${locale}`);
    }
  }

  private getNestedValue(obj: Record<string, unknown>, key: string): string | undefined {
    const keys = key.split('.');
    let current: unknown = obj;

    for (const k of keys) {
      if (current === null || current === undefined || typeof current !== 'object') {
        return undefined;
      }
      current = (current as Record<string, unknown>)[k];
    }

    return typeof current === 'string' ? current : undefined;
  }

  t(key: string, params?: MessageParams, locale?: string): string {
    const targetLocale = locale || this.detectLanguage();
    const data = this.loadLocale(targetLocale);
    
    let template = this.getNestedValue(data, key);
    
    // Fallback to English if not found
    if (template === undefined && targetLocale !== this.fallbackLocale) {
      const fallbackData = this.loadLocale(this.fallbackLocale);
      template = this.getNestedValue(fallbackData, key);
    }

    // Return raw key if template not found
    if (template === undefined) {
      return key;
    }

    // Interpolate parameters
    if (params) {
      return Object.entries(params).reduce(
        (result, [paramKey, paramValue]) => 
          result.replace(new RegExp(`{{${paramKey}}}`, 'g'), String(paramValue)),
        template
      );
    }

    return template;
  }

  setLocale(locale: string): void {
    this.defaultLocale = locale;
    this.cache.clear();
  }

  getLocale(): string {
    return this.defaultLocale;
  }
}

// Singleton instance
export const i18n = new I18nManager();