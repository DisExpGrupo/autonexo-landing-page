import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateService, TranslateCompiler, TranslateParser, MissingTranslationHandler, MissingTranslationHandlerParams, TranslateStore } from '@ngx-translate/core';
import { TranslateHttpLoader, TRANSLATE_HTTP_LOADER_CONFIG } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Simple compiler implementation
class SimpleTranslateCompiler implements TranslateCompiler {
  compile(value: string, lang: string): string {
    return value;
  }

  compileTranslations(translations: any, lang: string): any {
    return translations;
  } 
}

// Simple parser implementation
class SimpleTranslateParser implements TranslateParser {
  interpolate(expr: string, params?: any): string {
    return expr;
  }

  getValue(target: any, key: string): any {
    return target[key];
  }
}

// Simple missing translation handler
class SimpleMissingTranslationHandler implements MissingTranslationHandler {
  handle(params: MissingTranslationHandlerParams): string {
    return params.key;
  }
}

// Factory function for HttpLoader
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader();
}

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers,
    provideHttpClient(),
    {
      provide: TRANSLATE_HTTP_LOADER_CONFIG,
      useValue: {
        prefix: './assets/i18n/',
        suffix: '.json'
      }
    },
    {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    },
    {
      provide: TranslateCompiler,
      useClass: SimpleTranslateCompiler
    },
    {
      provide: TranslateParser,
      useClass: SimpleTranslateParser
    },
    {
      provide: MissingTranslationHandler,
      useClass: SimpleMissingTranslationHandler
    },
    TranslateStore,
    TranslateService
  ]
})
  .catch((err: any) => console.error(err));
