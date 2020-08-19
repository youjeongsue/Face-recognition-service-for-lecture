from django.conf.urls import url
from django.urls import path, include
from . import views

urlpatterns = [
    # path('', views.home),
    # path('login/', views.LogInView.as_view(), name='login'),
    # path('logout/',views.logout),
    # path('register/', views.RegisterView.as_view(), name='register'),

    path('dashboard/', views.LectureListView.as_view(), name='class'),
    path('lecture/<int:lecture_id>/', views.LectureView.as_view(), name='class_view'),
    path('students/<int:lecture_id>/', views.LectureStudentListView.as_view(), name='lecture_student_list_view'),
    path('student/<int:student_id>/', views.StudentView.as_view(), name='student_view'),
]