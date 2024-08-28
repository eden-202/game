import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryFormComponent } from './category-form/category-form.component';
import { GamesComponent } from './games/games.component';
import { SortingGameComponent } from './sorting-game/sorting-game.component';
import { HelpComponent } from './Help/Help.component';
import { MixedLettersComponent } from './mixed-letters/mixed-letters.component';
import { TriviaComponent } from './trivia/trivia.component';

export const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // הגדרת Dashboard כעמוד הבית
    { path: 'dashboard', component: DashboardComponent }, // עמוד הבית
    { path: 'newcategory', component: CategoryFormComponent },
    { path: 'category/:id', component: CategoryFormComponent },
    { path: 'help', component: HelpComponent }, // נתיב לעמוד העזרה
    { path: 'games', component: GamesComponent },
    { path: 'admin', component: CategoriesListComponent },
    { path: 'game/sorting/:category', component: SortingGameComponent },
    { path: 'game/mixed/:category', component: MixedLettersComponent },
    { path: 'game/trivia/:category', component: TriviaComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
