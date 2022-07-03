import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators';
import { ProductCategory } from '../common/product-category';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  //private productUrl = 'http://localhost:7799/api/products';
  private productUrl = environment.jonnycolShopApiUrl + "products";
  //private categoryUrl = 'http://localhost:7799/api/product-category';
  private categoryUrl = environment.jonnycolShopApiUrl + "product-category";

  constructor(private httpClient: HttpClient) { }

  getSingleProduct(productId: number): Observable<Product>{
    const singleProductUrl = this.productUrl + "/" + productId;
    return this.httpClient.get<Product>(singleProductUrl);
  }
  
  // Returns an observable.
  // Maps the JSON data from Spring Data REST to Product array
  getProductList(catId: number): Observable<Product[]>{
    // need to build URL based on category id
    const searchUrl = this.productUrl + '/search/findByCategoryId?id=' + catId;
    return this.getProducts(searchUrl);
  }

  getProductListByKeyWord(keyword: string): Observable<Product[]>{
    // backend rest api
    const searchUrl = this.productUrl + '/search/findByNameContaining?name=' + keyword;
    return this.getProducts(searchUrl);
  }
  
  getProducts(searchUrl: string){
    return this.httpClient.get<GetResponseProduct>(searchUrl).pipe(map(response => response._embedded.products));
  }

  getProductCategories(): Observable<ProductCategory[]> {
    //const searchUrl = this.productCategoryUrl + '/searchByProductCategoryId?=' + catId;
    
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(map(response => response._embedded.productCategory));  
  }

  // need to build URL based on category id, page, and size
  getProductListPaginated(page: number, pageSize: number, catId: number): Observable<GetResponseProduct>{
    // need to build URL based on category id
    const searchUrl = this.productUrl + '/search/findByCategoryId?id=' + catId + '&page=' + page + '&size=' + pageSize;
    console.log(`Getting products from - ${searchUrl}`);
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }

  getProductLisByKeywordPaginated(page: number, pageSize: number, keyword: string): Observable<GetResponseProduct>{
    const searchUrl = this.productUrl + '/search/findByNameContaining?name=' + keyword + '&page=' + page + '&size=' + pageSize;
    return this.httpClient.get<GetResponseProduct>(searchUrl);
  }
}

// Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseProduct{
  _embedded: {
    products: Product[];
  }
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

// Unwraps the JSON from Spring Data REST _embedded entry
interface GetResponseProductCategory{
  _embedded: {
    productCategory: ProductCategory[];
  }
}