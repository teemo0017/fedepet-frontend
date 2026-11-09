import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, from, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.includes('/auth')) {
            return next.handle(req);
        }

        return from(this.authService.getToken()).pipe(
            switchMap(token => {
                let authReq = req
                if (token) {
                    authReq = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                }

                return next.handle(authReq).pipe(
                    catchError(error => {
                        if (error.status === 401) {
                            console.log('Usuario NO Logeado');
                        }
                        return throwError(() => error)
                    })
                )
            })
        )
    }


}