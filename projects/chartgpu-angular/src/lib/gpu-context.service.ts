import { Injectable, computed, signal } from '@angular/core';
import { createPipelineCache } from 'chartgpu';
import type { ChartGPUCreateContext } from 'chartgpu';
import type { ChartgpuGPUContextState } from './chartgpu-angular.types';

const INITIAL_STATE: ChartgpuGPUContextState = {
  adapter: null,
  device: null,
  pipelineCache: null,
  error: null,
  isReady: false,
};

/**
 * Creates one shared WebGPU context and pipeline cache for charts in a dashboard.
 * The device is intentionally not destroyed with the service so charts can share it
 * for the lifetime of the application.
 */
@Injectable({ providedIn: 'root' })
export class ChartgpuGPUContextService {
  readonly state = signal<ChartgpuGPUContextState>(INITIAL_STATE);
  readonly context = computed<ChartGPUCreateContext | null>(() => {
    const state = this.state();
    if (!state.adapter || !state.device || !state.pipelineCache) {
      return null;
    }

    return {
      adapter: state.adapter,
      device: state.device,
      pipelineCache: state.pipelineCache,
    };
  });

  private initialization?: Promise<ChartgpuGPUContextState>;

  initialize(): Promise<ChartgpuGPUContextState> {
    if (!this.initialization) {
      this.initialization = this.createContext();
    }
    return this.initialization;
  }

  private async createContext(): Promise<ChartgpuGPUContextState> {
    try {
      if (typeof navigator === 'undefined' || !('gpu' in navigator)) {
        throw new Error('WebGPU not supported in this browser');
      }

      const gpu = (navigator as Navigator & {
        gpu?: {
          requestAdapter(options: {
            powerPreference: 'high-performance';
          }): Promise<ChartGPUCreateContext['adapter'] | null>;
        };
      }).gpu;
      if (!gpu) {
        throw new Error('WebGPU not supported in this browser');
      }

      const adapter = await gpu.requestAdapter({ powerPreference: 'high-performance' });
      if (!adapter) {
        const error = new Error('WebGPU is not available. No compatible GPUAdapter was found.');
        const state: ChartgpuGPUContextState = { ...INITIAL_STATE, error };
        this.state.set(state);
        return state;
      }

      const device = await adapter.requestDevice();
      const pipelineCache = createPipelineCache(device);
      const state: ChartgpuGPUContextState = {
        adapter,
        device,
        pipelineCache,
        error: null,
        isReady: true,
      };
      this.state.set(state);
      return state;
    } catch (cause: unknown) {
      const error = cause instanceof Error ? cause : new Error(String(cause));
      const state: ChartgpuGPUContextState = { ...INITIAL_STATE, error };
      this.state.set(state);
      return state;
    }
  }
}
