import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    // Check if token is provided
    if (!token) {
      throw new UnauthorizedException(
        'No se proporcionó un token de autorización',
      );
    }

    // Check if token is valid
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const payload = await this.jwtService.verifyAsync(token, { secret });

      // Converting issuedAt and expirationTime to Date objects
      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);

      // Assigning user to request object for further use
      request['user'] = payload;
    } catch {
      throw new UnauthorizedException('El token de autorización es inválido');
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export { AuthGuard };
