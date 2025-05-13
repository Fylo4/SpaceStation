import { Routes } from '@angular/router';
import { ArticleContainerComponent } from './pages/article-container/article-container.component';
import { ArticleSearchComponent } from './pages/article-search/article-search.component';

export enum RoutePaths {
  // Main page stuff
  Home = 'home',
  Comms = 'comms',
  Research = 'biodome',
  ArticleNew = 'article-new',
  ArticleEdit = 'article-edit',
  Games = 'games',
  Collections = 'collections',
  Blueprints = 'blueprints',
  Spacewalk = 'spacewalk',
  RecentComments = 'recent-comments',

  // Lists
  QuoteBook = 'quote-book',
  ListAlbums = 'list-albums',
}

// Define the routes
export const websiteSuffix = ' | Phil\'s Website';
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
    path: RoutePaths.RecentComments,
    loadComponent: () => import('./pages/recent-comments/recent-comments.page').then(m => m.RecentCommentsPage),
    title: 'Recent Comments'+websiteSuffix,
  },
  {
    path: RoutePaths.Research,
    // loadComponent: () => import('./pages/research/research.page').then(m => m.ResearchPage),
    component: ArticleSearchComponent,
    title: 'Research'+websiteSuffix,
  },
  {
    path: RoutePaths.ArticleNew,
    loadComponent: () => import('./pages/article-new/article-new.page').then(m => m.ArticleNewPage),
    title: 'New Article'+websiteSuffix,
  },
  {
    path: RoutePaths.ArticleEdit+'/:slug',
    loadComponent: () => import('./pages/article-edit/article-edit.page').then(m => m.ArticleEditPage),
    title: 'Edit Article'+websiteSuffix,
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
    path: 'article/:slug',
    component: ArticleContainerComponent,
    title: 'Article'+websiteSuffix, // TODO Use title service to rename tab to article title
  },
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
