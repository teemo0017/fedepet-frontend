import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, from, Observable, switchMap, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { ToastService } from "src/app/features/services/toast.service";

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastService: ToastService
    ) { }

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
                        // El JWT no tiene refresh (gap documentado): un 401 aquí
                        // siempre significa sesión expirada → re-login.
                        // No redirigir si el request que falló ES el login (evita bucle).
                        if (error.status === 401 && !req.url.includes('/auth/login')) {
                            this.handleUnauthorized();
                        }
                        return throwError(() => error)
                    })
                )
            })
        )
    }

    private async handleUnauthorized(): Promise<void> {
        await this.authService.logout();
        await this.toastService.error('Tu sesión expiró, inicia sesión de nuevo');
        const slug = await this.authService.getSlug();
        await this.router.navigateByUrl(`/${slug}/login`);
    }


}