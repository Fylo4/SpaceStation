import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "@auth0/auth0-angular";
import { from, switchMap } from "rxjs";
import { AuthDataService } from "../services/auth-data.service";

export const AuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
    const auth = inject(AuthService);
    const authData = inject(AuthDataService);

    // IF WE ARE AUTHENTICATED, add an auth header
    if (authData.isAuthenticated()) {
        return from(auth.getAccessTokenSilently()).pipe(
            switchMap((token) => {
              const cloned = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return next(cloned);
            })
        );
    }

    // IF WE ARE NOT AUTHENTICATED, just send the request with no added headers
    return next(req);
  
  };