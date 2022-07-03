import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Product } from 'src/app/common/product';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  //templateUrl: './product-list.component.html',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
 
  // Properties
  products: Product[] = [];
  currentCategoryId: number = 1;
  currentCategoryName: string = "";
  keywordSearch: boolean = false;

  // new properties for pagination
  pageNumber: number = 1;
  pageSize: number = 10;
  totalElements: number = 0;
  //previousCategoryId: number = 1;
  
  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {this.pageNumber=1, this.listProducts()});
  }

  listProducts(){
    this.keywordSearch = this.route.snapshot.paramMap.has("keyword");

    if(this.keywordSearch){
      this.handleProductsByKeyword();
    }
    else{
      this.handleListProducts();
    }
   
  }

  handleListProducts(){
    // check if 'id' parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if(hasCategoryId){
      // get the "id" param string, convert string to number using the "+" symbol
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id')!;

      // get the "name" param string
      this.currentCategoryName = this.route.snapshot.paramMap.get('name')!;
    }
    else{
      // not category id available... default to id 1
      this.currentCategoryId = 1;
      this.currentCategoryName = "Books";
    }

    //
    // check if we have a different category id than previous
    // Note: angular will reuse a component if it is currently being viewed
    //

    // if we have a different category id than previous
    // then set the pageNumber back to 1
    //if(this.previousCategoryId != this.currentCategoryId){
      //this.pageNumber = 1;
    //}

    //this.previousCategoryId = this.currentCategoryId;
    //console.log('currentCategoryId=' + this.currentCategoryId + ', pageNumber=' + this.pageNumber);


    // now get the products for the given category id
    // this.productService.getProductList().subscribe(data => this.products = data);
    // **this.productService.getProductList(this.currentCategoryId).subscribe(data => {this.products = data;})**

    this.productService.getProductListPaginated(this.pageNumber-1, this.pageSize, this.currentCategoryId).subscribe(this.processResult());

  }

  handleProductsByKeyword(){
    const searchName = this.route.snapshot.paramMap.get("keyword")!;
    this.productService.getProductListByKeyWord(searchName).subscribe(data => this.products = data);
    this.productService.getProductLisByKeywordPaginated(this.pageNumber-1, this.pageSize, searchName).subscribe(this.processResult());
  }

  processResult(){
    return (data: any) => {
      this.products = data._embedded.products;
      this.pageNumber = data.page.number + 1;
      this.pageSize = data.page.size;
      this.totalElements = data.page.totalElements;
    };
  }

  updatePageSize(size: number){
    this.pageSize = size;
    //this.pageNumber = 1;
    this.listProducts();
  }

  addToCart(product: Product){
    console.log(`Adding to cart: ${product.name}, ${product.unitPrice}`);
    const cartItem: CartItem = new CartItem(product);
    this.cartService.addToCart(cartItem);  
  }
}
