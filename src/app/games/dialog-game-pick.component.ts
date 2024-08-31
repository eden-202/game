import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoriesService } from '../services/categories.service';

@Component({
    selector: 'dialog-game-pick',
    templateUrl: './dialog-game-pick.component.html',
    styleUrls: ['./dialog-game-pick.component.css']
})
export class DialogGamePick {
    categories: any[];
    selectedCategory: any;

    constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoriesService) {
        this.categories = this.categoryService.list();
    }

    selectCategory(categoryId: number): void {
        this.selectedCategory = this.categories.find(c => c.id === categoryId);
    }
}
