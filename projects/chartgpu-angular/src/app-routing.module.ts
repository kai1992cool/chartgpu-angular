import { Routes } from '@angular/router';
import { AboutComponent } from './about.component';
import { StorybookViewerComponent } from './storybook-viewer.component';

export const routes: Routes = [
  { path: '', component: AboutComponent },
  { path: 'demos', component: StorybookViewerComponent },
  { path: 'v10', component: StorybookViewerComponent, data: { version: '10' } },
  { path: 'v11', component: StorybookViewerComponent, data: { version: '11' } },
  { path: 'v12', component: StorybookViewerComponent, data: { version: '12' } },
  { path: 'v13', component: StorybookViewerComponent, data: { version: '13' } },
  { path: 'v14', component: StorybookViewerComponent, data: { version: '14' } },
  { path: 'v15', component: StorybookViewerComponent, data: { version: '15' } },
  { path: 'v16', component: StorybookViewerComponent, data: { version: '16' } },
  { path: 'v17', component: StorybookViewerComponent, data: { version: '17' } },
  { path: 'v18', component: StorybookViewerComponent, data: { version: '18' } },
  { path: 'v19', component: StorybookViewerComponent, data: { version: '19' } },
  { path: 'v20', component: StorybookViewerComponent, data: { version: '20' } },
  { path: 'v21', component: StorybookViewerComponent, data: { version: '21' } },
  { path: 'v22', component: StorybookViewerComponent, data: { version: '22' } },
  { path: '**', redirectTo: '' }
];