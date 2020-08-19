from django.urls import path
from knox.views import LogoutView

from .views import (
    RegistrationAPI,
    LoginAPI,
    UserAPI
)

urlpatterns = [
    #account
    path("auth/register/", RegistrationAPI.as_view()),
    path("auth/login/", LoginAPI.as_view()),
    path("auth/logout/", LogoutView.as_view()),
    path("auth/user/", UserAPI.as_view()),
]