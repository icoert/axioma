// @vitest-environment jsdom
import { afterEach,it,expect } from 'vitest';
import { cleanup,fireEvent,render,screen } from '@testing-library/react';
import { GlossaryText } from '../src/components/Glossary';
import { MathFormula } from '../src/components/Math';
afterEach(cleanup);
it('opens Romanian help on focus and tap, closes on Escape and outside interaction',()=>{
 render(<GlossaryText text="Derivata descrie panta."/>);const button=screen.getByRole('button',{name:'Explică «Derivata»'});fireEvent.focus(button);expect(screen.getByRole('tooltip').textContent).toContain('Limita raportului');expect(button.getAttribute('aria-describedby')).toBe(screen.getByRole('tooltip').id);fireEvent.keyDown(document,{key:'Escape'});expect(screen.queryByRole('tooltip')).toBeNull();fireEvent.click(button);expect(screen.getByRole('tooltip')).toBeTruthy();fireEvent.pointerDown(document.body);expect(screen.queryByRole('tooltip')).toBeNull();
});
it('provides formula help without placing focusable controls inside hidden KaTeX',()=>{
 const {container}=render(<MathFormula value={"\\int_0^1 x^2\\,dx"}/>);expect(container.querySelector('.katex-mathml')).toBeTruthy();expect(container.querySelector('.katex-html [tabindex]')).toBeNull();const button=screen.getByRole('button',{name:'Explică simbolul ∫: Integrală'});fireEvent.focus(button);expect(screen.getByRole('tooltip').textContent).toContain('integrare');fireEvent.blur(button);expect(screen.queryByRole('tooltip')).toBeNull();const symbol=container.querySelector('[data-math-symbol="∫"]')!;fireEvent.mouseOver(symbol);expect(screen.getByRole('tooltip')).toBeTruthy();
});
