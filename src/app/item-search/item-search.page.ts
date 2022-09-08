import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-item-search',
  templateUrl: 'item-search.page.html',
  styleUrls: ['item-search.page.scss'],
})
export class Tab1Page implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  public currentPageNumber = 1;
  public totalItems: number;
  public itemListData = [];
  public pageLimit: number;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getAllItems();
  }

  getAllItems(newPage: number = 0) {
    return new Promise<void>((resolve, reject) => {
      const itemsUrl = `https://api.churchofiron.co.uk/items/all?page_number=${newPage}`;
      this.http.get(itemsUrl).subscribe((res: any) => {
        this.itemListData.push(...res.items);
        this.totalItems = res.total;
        this.pageLimit = Math.ceil(res.total / res.page_size);

        resolve();
      });
    });
  }

  async loadMoreData(event) {
    const newPage = this.currentPageNumber++;
    await this.getAllItems(newPage);
    event.target.complete();
    if (this.currentPageNumber === this.pageLimit) {
      event.target.disabled = true;
    }
  }

  searchSpecificItem(searchValue: CustomEvent) {
    if (!searchValue?.detail?.value) {
      this.clearItems();
      return;
    }

    const searchItemsUrl = `https://api.churchofiron.co.uk/items/search?search_text=${searchValue?.detail?.value}`;
    this.http.get(searchItemsUrl).subscribe((res: any) => {
      this.infiniteScroll.disabled = true;
      this.currentPageNumber = 0;
      this.itemListData = res;

      console.log(res);
    });
  }

  clearItems() {
    this.infiniteScroll.disabled = false;
    this.currentPageNumber = 1;
    this.itemListData = [];
    this.getAllItems();
  }

  convertGameKey(key) {
    switch (key) {
      case "nl":
        return 'New Leaf';
      case "nh":
        return 'New Horizon';
      case "cf":
        return 'City Folk';
      case "ww":
        return 'Wild World';
      case "afe+":
        return 'Animal Forest e+';
      case "ac":
        return 'Animal Crossing';

      default:
        console.log(key);
        return 'Unknown Game Found...';
    }
  }

  getBuyPrice(gameValue) {
    if (gameValue?.sellPrice) {
      return `${gameValue.sellPrice?.value} ${gameValue.sellPrice?.currency}`; 
    }
    return "Can not sell item in-game.";
  }
}
