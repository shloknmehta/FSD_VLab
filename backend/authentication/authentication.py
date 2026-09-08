from rest_framework.authentication import TokenAuthentication

class BearerOrTokenAuthentication(TokenAuthentication):
    """
    Allows authentication using either 'Token <key>' or 'Bearer <key>' in Authorization header.
    """
    def authenticate(self, request):
        auth_header = request.headers.get('Authorization', '')
        parts = auth_header.split()
        if len(parts) == 2 and parts[0].lower() in ['token', 'bearer']:
            return self.authenticate_credentials(parts[1])
        return super().authenticate(request)
