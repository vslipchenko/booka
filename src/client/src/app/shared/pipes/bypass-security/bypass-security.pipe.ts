import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Pipe({
  name: 'bypassSecurity',
})
export class BypassSecurityPipe implements PipeTransform {
  public constructor(private readonly domSanitizer: DomSanitizer) {}

  public transform(value: string, securityContext: 'url'): SafeUrl | string {
    // See SecurityContext
    if (securityContext === 'url') return this.domSanitizer.bypassSecurityTrustUrl(value);

    return value;
  }
}
