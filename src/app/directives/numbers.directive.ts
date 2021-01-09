import { Directive, ElementRef, HostListener, Input } from "@angular/core";

@Directive({
    selector: '[limitedDigits]'
})

export class InputDirective {
    constructor(private elRef: ElementRef) {
       elRef.nativeElement.maxLength = 10;
       elRef.nativeElement.max = 10;
       console.log(elRef)
    }

    @HostListener('input', ['$event']) onInputChange(event) {
        const initialValue = this.elRef.nativeElement.value;
        this.elRef.nativeElement.value = initialValue.replace(/[^0-9]*/g, '');// replaces anything that is not a number with nothing
        if(initialValue !== this.elRef.nativeElement.value) {
            event.stopPropagation();
        }
    }

}