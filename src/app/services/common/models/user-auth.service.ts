import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async login(userNameOrEmail: string, password: string, calback?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      action: "login",
      controller: "auth"
    }, { userNameOrEmail, password })

    const token: TokenResponse = await firstValueFrom(observable) as TokenResponse;
    if (token) {
      localStorage.setItem("accessToken", token.token.accessToken);
      localStorage.setItem("expiration", token.token.expiration.toString())
      this.toastrService.message("Giriş başarılı.", "Başarılı", { messageType: ToastrMessageType.Success, position: ToastrPosition.TopRight })

    }

    calback();
  }
}
