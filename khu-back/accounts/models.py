from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class UserManager(BaseUserManager):    
    
    use_in_migrations = True    
    
    def create_user(self, username, email, password):
        
        if not email :
            raise ValueError('must have user email')
        user = self.model(
            email = self.normalize_email(email),
            username = username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, username, email ,password):
       
        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
            password=password
        )        
        user.is_admin = True
        user.is_superuser = True
        user.save(using=self._db)
        return user

class User(AbstractUser):
    objects = UserManager()