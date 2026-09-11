import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'modulo-01-algoritmos',
    loadChildren: () => import('./modulo-01-algoritmos/modulo-01-algoritmos-module').then(m => m.Modulo01AlgoritmosModule)
  },
  {
    path: 'modulo-02-typescript',
    loadChildren: () => import('./modulo-02-typescript/modulo-02-typescript-module').then(m => m.Modulo02TypescriptModule)
  },
  {
    path: 'modulo-03-fundamentos-angular',
    loadChildren: () => import('./modulo-03-fundamentos-angular/modulo-03-fundamentos-angular-module').then(m => m.Modulo03FundamentosAngularModule)
  },
  {
    path: 'modulo-04-componentes-diretivas',
    loadChildren: () => import('./modulo-04-componentes-diretivas/modulo-04-componentes-diretivas-module').then(m => m.Modulo04ComponentesDiretivasModule)
  },
  {
    path: 'modulo-05-services-di',
    loadChildren: () => import('./modulo-05-services-di/modulo-05-services-di-module').then(m => m.Modulo05ServicesDiModule)
  },
  {
    path: 'modulo-06-http-apis',
    loadChildren: () => import('./modulo-06-http-apis/modulo-06-http-apis-module').then(m => m.Modulo06HttpApisModule)
  },
  {
    path: 'modulo-07-reactive-forms',
    loadChildren: () => import('./modulo-07-reactive-forms/modulo-07-reactive-forms-module').then(m => m.Modulo07ReactiveFormsModule)
  },
  {
    path: 'modulo-08-routing',
    loadChildren: () => import('./modulo-08-routing/modulo-08-routing-module').then(m => m.Modulo08RoutingModule)
  },
  {
    path: 'modulo-09-rxjs',
    loadChildren: () => import('./modulo-09-rxjs/modulo-09-rxjs-module').then(m => m.Modulo09RxjsModule)
  },
  {
    path: 'modulo-10-state-management',
    loadChildren: () => import('./modulo-10-state-management/modulo-10-state-management-module').then(m => m.Modulo10StateManagementModule)
  },
  {
    path: 'modulo-11-testing',
    loadChildren: () => import('./modulo-11-testing/modulo-11-testing-module').then(m => m.Modulo11TestingModule)
  },
  {
    path: 'modulo-12-performance',
    loadChildren: () => import('./modulo-12-performance/modulo-12-performance-module').then(m => m.Modulo12PerformanceModule)
  },
  {
    path: 'modulo-13-patterns',
    loadChildren: () => import('./modulo-13-patterns/modulo-13-patterns-module').then(m => m.Modulo13PatternsModule)
  },
  {
    path: 'modulo-14-projeto-final',
    loadChildren: () => import('./modulo-14-projeto-final/modulo-14-projeto-final-module').then(m => m.Modulo14ProjetoFinalModule)
  },
  {
    path: '',
    redirectTo: '/modulo-01-algoritmos',
    pathMatch: 'full'
  }
];
