import os
import requests
from dotenv import load_dotenv
import webbrowser
from urllib.parse import urlencode

# Load environment variables
load_dotenv()

# Supabase project details
SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
GITHUB_CLIENT_ID = os.getenv("GITHUB_CLIENT_ID")
GITHUB_CLIENT_SECRET = os.getenv("GITHUB_CLIENT_SECRET")
REDIRECT_URI = os.getenv("REDIRECT_URI")

def get_jwt_token(email: str = None, password: str = None, provider: str = "email") -> dict:
    """Get JWT token from Supabase using either email/password or GitHub OAuth."""
    
    if provider == "email":
        if not email or not password:
            print("Email and password are required for email authentication")
            return None
            
        url = f"{SUPABASE_URL}/auth/v1/token?grant_type=password"
        
        headers = {
            "apikey": SUPABASE_KEY,
            "Content-Type": "application/json"
        }
        
        data = {
            "email": email,
            "password": password
        }
        
        response = requests.post(url, headers=headers, json=data)
        
    elif provider == "github":
        # Start GitHub OAuth flow
        auth_params = {
            "client_id": GITHUB_CLIENT_ID,
            "redirect_uri": REDIRECT_URI,
            "scope": "read:user user:email",
            "response_type": "code",
            # "state": os.urandom(16).hex()  # Add state parameter for security
        }
        
        # Use GitHub's OAuth endpoint directly
        auth_url = "https://github.com/login/oauth/authorize?" + urlencode(auth_params)
        
        print("\nOpening browser for GitHub authentication...")
        print(f"Redirect URI: {REDIRECT_URI}")  # Print the redirect URI for debugging
        webbrowser.open(auth_url)
        
        code = input("\nPlease enter the code from the callback URL: ")
        
        # Exchange code for token with GitHub first
        github_token_url = "https://github.com/login/oauth/access_token"
        github_data = {
            "client_id": GITHUB_CLIENT_ID,
            "client_secret": GITHUB_CLIENT_SECRET,
            "code": code,
            "redirect_uri": REDIRECT_URI
        }
        github_headers = {
            "Accept": "application/json"
        }
        
        github_response = requests.post(github_token_url, headers=github_headers, json=github_data)
        
        if github_response.status_code != 200:
            print(f"\nError getting GitHub token: {github_response.status_code}")
            print(github_response.json())
            return None
            
        github_token = github_response.json().get("access_token")
        
        # Now exchange GitHub token with Supabase
        supabase_token_url = f"{SUPABASE_URL}/auth/v1/token?grant_type=github"
        supabase_headers = {
            "apikey": SUPABASE_KEY,
            "Content-Type": "application/json"
        }
        supabase_data = {
            "github_token": github_token
        }
        
        response = requests.post(supabase_token_url, headers=supabase_headers, json=supabase_data)
    
    else:
        print(f"Unsupported provider: {provider}")
        return None
    
    if response.status_code == 200:
        print("\nSuccess! Here's your JWT token:\n")
        print(response.json()["access_token"])
        return response.json()
    else:
        print(f"\nError: {response.status_code}")
        print(response.json())
        return None

def test_jwt_token(jwt_token: str):
    """Test the JWT token against our dummy endpoint."""
    
    url = "http://localhost:8000/api/v1/test"
    
    headers = {
        "Authorization": f"Bearer {jwt_token}"
    }
    
    response = requests.get(url, headers=headers)
    
    print("\nTesting token with our API:")
    print(f"Status: {response.status_code}")
    print("Response:", response.json())

if __name__ == "__main__":
    auth_type = input("Choose authentication method (1 for email/password, 2 for GitHub): ")
    
    if auth_type == "1":
        email = input("Enter your email: ")
        password = input("Enter your password: ")
        result = get_jwt_token(email=email, password=password, provider="email")
    elif auth_type == "2":
        result = get_jwt_token(provider="github")
    else:
        print("Invalid authentication method")
        exit(1)
    
    if result and result.get("access_token"):
        test = input("\nWould you like to test this token with the API? (y/n): ")
        if test.lower() == 'y':
            test_jwt_token(result["access_token"])