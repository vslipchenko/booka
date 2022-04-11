import {Injectable} from '@angular/core';
import {Language} from '~app/typings/i18n.types';
import {DEFAULT_LANGUAGE, LANGUAGES} from '~app/constants/i18n';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public resolveLanguage(savedLanguage: Language): Language {
    if (savedLanguage) return savedLanguage;

    const preservedLanguage = this.getStoredLanguage();

    if (preservedLanguage) return preservedLanguage;

    const navigatorLanguage = navigator.language.split('-')[0] as Language; // Possible values can include locale as well: en-GB, uk, etc.
    // If browser language is supported by the app
    if (LANGUAGES.includes(navigatorLanguage)) return navigatorLanguage;

    return DEFAULT_LANGUAGE;
  }

  public storeLanguage(language: Language): void {
    localStorage.setItem('language', language);
  }

  public getStoredLanguage(): Language {
    return localStorage.getItem('language') as Language;
  }
}
