from django.shortcuts import render

from django.shortcuts import redirect, render
from .models import Professor, Student, Lecture
from .serializers import *
from django.contrib import auth
import json
from django.http.response import HttpResponse, JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.views.generic import View
from django.core.serializers import serialize

from rest_framework.renderers import JSONRenderer
from rest_framework import generics, serializers
from rest_framework.response import Response


# class RegisterView(View):
#     def get(self, request):
#         return render(request, 'register.html')

#     def post(self, request):
#         email = request.POST.get('email')
#         password = request.POST.get('password')
#         confirm_password = request.POST.get('confirm_password')
#         name = request.POST.get('name')
#         department = request.POST.get('department')

#         res_data={}
#         if not(email and password and confirm_password and name and department):
#             res_data['error']='모든 값을 입력해야합니다'
#             try:
#                 Professor.objects.get(email=email)
#                 res_data['error']='이미 존재하는 이메일입니다'
#             except:
#                 pass
#         elif password != confirm_password:
#             res_data['error']='비밀번호가 다름'
#         else:
#             prof = Professor(
#                 email=email,
#                 password=make_password(password),
#                 name=name,
#                 department=department,
#                 is_deleted=False
#             )
#             prof.save()
#             res_data['error']='회원가입이 완료되었습니다'

#         return render(request, 'register.html', res_data)

# class LogInView(View):
#     def get(self, request):
#         return render(request, 'login.html')

#     def post(self, request):
#         email = request.POST.get('email')
#         password = request.POST.get('password')

#         res_data={}
#         if not (email and password):
#             res_data['error']='모든 칸을 다 입력해주세요.'
#         else:
#             prof = Professor.objects.get(email=email)
#             if check_password(password, prof.password):
#                 request.session['prof']=prof.id

#                 return redirect('/')
#             else:
#                 res_data['error']='비밀번호가 틀렸습니다.'
#         return render(request, 'login.html', res_data)

# def home(request):
#     prof_pk = request.session.get('prof')

#     if prof_pk:
#         prof=Professor.objects.get(pk=prof_pk)
#         return HttpResponse(prof)
#     return HttpResponse('로그인 성공')

# def logout(request):
#     if request.session['prof']:
#         del request.session['prof']
#     return redirect('/')

class LectureListView(generics.ListAPIView):
    queryset = Lecture.objects.all()
    serializer_class = LectureSerializer

    def list(self, request):
        queryset = self.get_queryset()
        serializer_class = self.get_serializer_class()
        serializer = serializer_class(queryset, many=True)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        return Response(serializer.data)

class StudentView(generics.GenericAPIView):
    def get(self, request, student_id):
        student = Student.objects.get(pk=student_id)
        serializer = StudentSerializer(student)
        return JsonResponse({"student": serializer.data})

class LectureView(generics.GenericAPIView):
    def get(self, request, lecture_id):
        lecture = Lecture.objects.get(pk=lecture_id)
        serializer = LectureSerializer(lecture)
        return JsonResponse({"lecture": serializer.data})

class LectureStudentListView(generics.ListAPIView):
    def list(self, request, lecture_id):
        lecture = Lecture.objects.get(pk=lecture_id)
        student_list = lecture.students.all()
        serializer = StudentSerializer(student_list, many=True)
        return JsonResponse({"students": serializer.data})