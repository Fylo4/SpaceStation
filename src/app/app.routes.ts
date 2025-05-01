import { Routes } from '@angular/router';
import { ArticleContainerComponent } from './pages/article-container/article-container.component';
import { ArticleSearchComponent } from './pages/article-search/article-search.component';

export enum RoutePaths {
  // Main page stuff
  Home = 'home',
  Comms = 'comms',
  Research = 'research',
  Games = 'games',
  Collections = 'collections',
  Blueprints = 'blueprints',
  Spacewalk = 'spacewalk',

  // Life
  LifeSystems = 'life-systems',
  GoodList = 'good-list',
  MySystem = 'system',
  Beliefs = 'beliefs',

  // Christianity
  ChristCommandment = 'greatest-commandment',
  ChristLgbt = 'christianity-and-lgbt',
  ChristPrayer = 'lords-prayer',
  ChristUnity = 'christianity-and-unity',
  ChristKingdom = 'kingdom-of-heaven',
  
  // Lists
  QuoteBook = 'quote-book',
  ListAlbums = 'list-albums',

  // Misc
  Selflessness = 'selflessness',
}

// Define the routes
const websiteSuffix = ' | Phil\'s Website';
export const routes: Routes = [
  {
    path: RoutePaths.Home,
    loadComponent: () => import('./pages/home/home.page').then(m => m.HomePageComponent),
    title: 'Home'+websiteSuffix,
  },
  {
    path: RoutePaths.Comms,
    loadComponent: () => import('./pages/comms/comms.page').then(m => m.CommsPage),
    title: 'Comms Relay'+websiteSuffix,
  },
  {
    path: RoutePaths.Research,
    // loadComponent: () => import('./pages/research/research.page').then(m => m.ResearchPage),
    component: ArticleSearchComponent,
    title: 'Research'+websiteSuffix,
  },
  {
    path: RoutePaths.Games,
    loadComponent: () => import('./pages/games/games.page').then(m => m.GamesPage),
    title: 'Games'+websiteSuffix,
  },
  {
    path: RoutePaths.Collections,
    loadComponent: () => import('./pages/collections/collections.page').then(m => m.CollectionsPage),
    title: 'Collections'+websiteSuffix,
  },
  {
    path: RoutePaths.Blueprints,
    loadComponent: () => import('./pages/blueprints/blueprints.page').then(m => m.BlueprintsPage),
    title: 'Blueprints'+websiteSuffix,
  },
  {
    path: RoutePaths.Spacewalk,
    loadComponent: () => import('./pages/spacewalk/spacewalk.page').then(m => m.SpacewalkPage),
    title: 'Space Walk'+websiteSuffix,
  },

  {
    path: RoutePaths.ListAlbums,
    loadComponent: () => import('./pages/articles/list-albums/list-albums.page').then(m => m.ListAlbumsPage),
    title: 'Albums'+websiteSuffix,
  },
  {
    path: RoutePaths.QuoteBook,
    loadComponent: () => import('./pages/articles/quote-book/quote-book.page').then(m => m.QuoteBookPage),
    title: 'Quotes'+websiteSuffix,
  },
  {
    path: RoutePaths.LifeSystems,
    loadComponent: () => import('./pages/articles/life-systems/life-systems.page').then(m => m.LifeSystemsPage),
    title: 'Life Systems'+websiteSuffix,
  },
  {
    path: RoutePaths.LifeSystems,
    loadComponent: () => import('./pages/articles/good-list/good-list.page').then(m => m.GoodListPage),
    title: 'Good List'+websiteSuffix,
  },
  {
    path: RoutePaths.MySystem,
    loadComponent: () => import('./pages/articles/my-system/my-system.page').then(m => m.MySystemPage),
    title: 'My System'+websiteSuffix,
  },
  {
    path: RoutePaths.Beliefs,
    loadComponent: () => import('./pages/articles/life-beliefs/beliefs.page').then(m => m.BeliefsPage),
    title: 'Beliefs'+websiteSuffix,
  },
  {
    path: RoutePaths.GoodList,
    loadComponent: () => import('./pages/articles/good-list/good-list.page').then(m => m.GoodListPage),
    title: 'Good List'+websiteSuffix,
  },
  {
    path: RoutePaths.ChristCommandment,
    loadComponent: () => import('./pages/articles/christ-great-commandment/christ-great-commandment.page').then(m => m.ChristGreatCommandmentPage),
    title: 'The Greatest Commandment'+websiteSuffix,
  },
  {
    path: RoutePaths.ChristLgbt,
    loadComponent: () => import('./pages/articles/christ-lgbt/christ-lgbt.page').then(m => m.ChristLgbtPage),
    title: 'LBGTQ+ and Christianity'+websiteSuffix,
  },
  {
    path: RoutePaths.ChristPrayer,
    loadComponent: () => import('./pages/articles/christ-prayer/christ-prayer.page').then(m => m.ChristPrayerPage),
    title: 'The Lord\'s Prayer'+websiteSuffix,
  },
  {
    path: RoutePaths.ChristUnity,
    loadComponent: () => import('./pages/articles/christ-unity/christ-unity.page').then(m => m.ChristUnityPage),
    title: 'Unity and Christianity'+websiteSuffix,
  },
  {
    path: RoutePaths.ChristKingdom,
    loadComponent: () => import('./pages/articles/christ-kingdom/christ-kingdom.page').then(m => m.ChristKingdomPage),
    title: 'Kingdom of Heaven'+websiteSuffix,
  },
  {
    path: RoutePaths.Selflessness,
    loadComponent: () => import('./pages/articles/selflessness/selflessness.page').then(m => m.SelflessnessPage),
    title: 'Selflessness'+websiteSuffix,
  },
  {
    path: 'article/:slug',
    component: ArticleContainerComponent,
    title: 'Article', // TODO Use title service to rename tab to article title
  },
  // {
  //   path: 'article-search',
  //   component: ArticleSearchComponent,
  //   title: 'Search Articles',
  // },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: RoutePaths.Home,
  },
  {
    path: '**',
    redirectTo: RoutePaths.Home,
  },
];
