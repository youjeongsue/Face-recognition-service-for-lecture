from django.contrib import admin
from lectures.models import *

admin.site.register(Lecture)
admin.site.register(Student)
admin.site.register(Professor)
# admin.site.register(Score)