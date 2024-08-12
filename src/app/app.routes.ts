import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { SortingGameComponent } from './sorting-game/sorting-game.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
    {path: "newcategory", component: CategoryFormComponent},
    {path: "category/:id", component: CategoryFormComponent},
    {path: "about", component: AboutComponent},
    {path: "games", component: GamesComponent},
    {path: "admin", component: CategoriesListComponent},
    {path: "game/:id", component: GameComponent},
    {path: 'game/sorting/:category', component: SortingGameComponent },
    {path: "", component: DashboardComponent},
];
