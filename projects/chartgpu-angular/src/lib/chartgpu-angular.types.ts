import type { ChartGPUOptions } from 'chartgpu';
import type {
  AnimationConfig,
  AnnotationConfig,
  AxisConfig,
  ChartGPUCreateContext,
  ChartGPUCrosshairMovePayload,
  ChartGPUEventPayload,
  ChartGPUHitTestResult,
  ChartGPUInstance,
  ChartGPUDeviceLostPayload,
  ChartSyncOptions,
  DataZoomConfig,
  DataPoint,
  OHLCDataPoint,
  PipelineCache,
  RenderMode,
  SeriesConfig,
  SeriesType,
  ThemeConfig,
  TooltipConfig,
} from 'chartgpu';

export type ChartgpuOptions = ChartGPUOptions;
export type ChartgpuSeriesType = SeriesType;
export type ChartgpuSeriesData = Extract<SeriesConfig, { type: 'line' }>['data'];
export type ChartgpuSeriesOptions = SeriesConfig;
export type ChartgpuAxisOptions = AxisConfig;
export type ChartgpuZoomOptions = DataZoomConfig;
export type ChartgpuTooltipOptions = TooltipConfig;
export type ChartgpuAnimationOptions = AnimationConfig | boolean;
export type ChartgpuThemeOptions = ThemeConfig | 'light' | 'dark';
export type ChartgpuAnnotationOptions = AnnotationConfig;
export type ChartgpuThreeDOptions = Pick<ChartGPUOptions, 'coordinateSystem' | 'camera' | 'interaction3d' | 'axes3d'>;
export type ChartgpuStreamingOptions = Pick<ChartGPUOptions, 'autoScroll'>;
export type ChartgpuInteractionOptions = Pick<ChartGPUOptions, 'dataZoom' | 'tooltip'>;
export type ChartgpuChartInstance = ChartGPUInstance;
export type ChartgpuGPUContext = ChartGPUCreateContext;
export type ChartgpuStyle = Record<string, string | number | null | undefined>;
export type ChartgpuZoomRange = NonNullable<ReturnType<ChartGPUInstance['getZoomRange']>>;
export type ChartgpuClickParams = ChartGPUEventPayload;
export type ChartgpuMouseOverParams = ChartGPUEventPayload;
export type ChartgpuCrosshairMoveParams = ChartGPUCrosshairMovePayload;
export type ChartgpuHitTestResult = ChartGPUHitTestResult;
export type ChartgpuRenderMode = RenderMode;
export type ChartgpuSyncOptions = ChartSyncOptions;

export type ChartgpuXYArraysData = Readonly<{
  x: ArrayLike<number>;
  y: ArrayLike<number>;
  size?: ArrayLike<number>;
}>;
export type ChartgpuInterleavedXYData = ArrayBufferView;
export type ChartgpuCartesianSeriesData =
  | ReadonlyArray<DataPoint | null>
  | ChartgpuXYArraysData
  | ChartgpuInterleavedXYData;
export type ChartgpuAppendDataOptions = Readonly<{ maxPoints?: number }>;

export interface ChartgpuDataAppendEvent {
  seriesIndex: number;
  count: number;
  xExtent: { min: number; max: number };
}

export interface ChartgpuReadyEvent {
  container: HTMLDivElement;
}

export interface ChartgpuResizeEvent {
  width: number;
  height: number;
  container: HTMLDivElement;
}

export interface ChartgpuClickEvent {
  x: number;
  y: number;
}

export interface ChartgpuZoomChangeEvent {
  range: { start: number; end: number };
}

export interface ChartgpuZoomRangeChangeEvent {
  start: number;
  end: number;
}

export interface ChartgpuGPUContextState {
  adapter: ChartGPUCreateContext['adapter'] | null;
  device: ChartGPUCreateContext['device'] | null;
  pipelineCache: PipelineCache | null;
  error: Error | null;
  isReady: boolean;
}

export interface ChartgpuChartHandle {
  getChart(): ChartGPUInstance | null;
  getContainer(): HTMLDivElement | null;
  appendData(
    seriesIndex: number,
    newPoints: ChartgpuCartesianSeriesData | OHLCDataPoint[],
    options?: ChartgpuAppendDataOptions,
  ): void;
  renderFrame(): boolean;
  needsRender(): boolean;
  getRenderMode(): RenderMode;
  setRenderMode(mode: RenderMode): void;
  setOption(options: ChartgpuOptions): void;
  setZoomRange(start: number, end: number, source?: unknown): void;
  setInteractionX(x: number | null, source?: unknown): void;
  getInteractionX(): number | null;
  hitTest(event: PointerEvent | MouseEvent): ChartGPUHitTestResult | null;
}

export type {
  ChartGPUCreateContext,
  ChartGPUCrosshairMovePayload,
  ChartGPUDeviceLostPayload,
  ChartGPUEventPayload,
  ChartGPUHitTestResult,
  ChartGPUInstance,
  ChartSyncOptions,
  DataPoint,
  OHLCDataPoint,
  PipelineCache,
  RenderMode,
};
