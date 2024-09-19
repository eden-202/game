import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CategoriesService } from '../services/categories.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { GameProfile } from '../../shared/model/GameProfile';

@Component({
    selector: 'dialog-game-pick',
    templateUrl: './dialog-game-pick.html',
    standalone: true,
    imports: [CommonModule, RouterLink, MatDialogModule, MatButtonModule, MatFormFieldModule, MatSelectModule],
    // styleUrls: ['./dialog-game-pick.component.css']
})
export class DialogGamePick {
    
    categoyList:any;
    categoryPick = 0;
    categorPickData:any;
    gameAlias:any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public selectedGameProfile: GameProfile,
        public categoryAPI:CategoriesService,
        private router: Router
    ) {
        this.categoyList = this.categoryAPI.list();
    }

    categorySelect(category:any){
        

        this.categoryPick = category;
        this.categorPickData = this.categoyList.filter((obj:any) => obj.id == this.categoryPick)[0];
    }

    playGame(){
        if (this.selectedGameProfile != undefined && this.categoryPick != undefined) {
            let gameUrl = this.selectedGameProfile.url;
            let category = this.categorPickData.id;
            this.router.navigate(['game/'+gameUrl, category]);
          }
    }
    
    // categories: any[];
    // selectedCategory: any;

    // constructor(@Inject(MAT_DIALOG_DATA) public data: any, private categoryService: CategoriesService) {
    //     this.categories = this.categoryService.list();
    // }

    // selectCategory(categoryId: number): void {
    //     this.selectedCategory = this.categories.find(c => c.id === categoryId);
    // }
}
