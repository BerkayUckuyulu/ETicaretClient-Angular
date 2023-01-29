import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Token } from 'src/app/contracts/token/token';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { Create_User } from 'src/app/contracts/users/create_user';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService, private toastrService: CustomToastrService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({
      controller: "Users"
    }, user);

    return await firstValueFrom(observable) as Create_User;
  }

  async login(userNameOrEmail: string, password: string, calback?: () => void): Promise<any> {
    const observable: Observable<any | TokenResponse> = this.httpClientService.post<any | TokenResponse>({
      action: "login",
      controller: "users"
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
