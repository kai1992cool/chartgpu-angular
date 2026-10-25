import { TestBed } from '@angular/core/testing';
import { ChartgpuAngularComponent } from './chartgpu-angular.component';

describe('ChartgpuAngularComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ChartgpuAngularComponent]
    });
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ChartgpuAngularComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('exposes safe imperative defaults before a chart is ready', () => {
    const fixture = TestBed.createComponent(ChartgpuAngularComponent);
    const component = fixture.componentInstance;

    expect(component.getChart()).toBeNull();
    expect(component.getContainer()).toBeNull();
    expect(component.renderFrame()).toBe(false);
    expect(component.needsRender()).toBe(false);
    expect(component.getRenderMode()).toBe('auto');
    expect(component.getInteractionX()).toBeNull();
    expect(component.hitTest(new MouseEvent('mousemove'))).toBeNull();
  });

  it('emits local click coordinates', () => {
    const fixture = TestBed.createComponent(ChartgpuAngularComponent);
    const click = vi.fn();
    fixture.componentInstance.click.subscribe(click);
    fixture.componentRef.setInput('options', { series: [] });
    fixture.detectChanges();

    const event = new MouseEvent('click');
    Object.defineProperty(event, 'offsetX', { value: 12 });
    Object.defineProperty(event, 'offsetY', { value: 24 });
    fixture.nativeElement.querySelector('.chartgpu-host').dispatchEvent(event);

    expect(click).toHaveBeenCalledWith({ x: 12, y: 24 });
  });

  it('reports unsupported WebGPU browsers in the component', () => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: {} });

    try {
      const fixture = TestBed.createComponent(ChartgpuAngularComponent);
      fixture.componentRef.setInput('options', { series: [] });
      fixture.detectChanges();

      expect(fixture.nativeElement.querySelector('[role="alert"]').textContent)
        .toContain('WebGPU not supported in this browser');
    } finally {
      if (descriptor) {
        Object.defineProperty(globalThis, 'navigator', descriptor);
      } else {
        Reflect.deleteProperty(globalThis, 'navigator');
      }
    }
  });

});
